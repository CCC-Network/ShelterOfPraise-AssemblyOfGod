import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.VITE_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_PUBLIC_SUPABASE_ANON_KEY || '';
export const supabase = createClient(supabaseUrl, supabaseKey);

// Type definitions
export interface Testimonial {
  id: number | string;
  name: string;
  image: string;
  testimonial: string;
  role: string;
  created_at?: string;
}

export interface TestimonialFormData {
  name: string;
  role: string;
  message: string;
  image: File | string | null;
}

// Template/Metadata testimonials for frontend (always displayed)
export const templateTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "John Doe",
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b15c2fd0?w=150&h=150&fit=crop&crop=face&auto=format",
    testimonial:
      "This church has been a blessing to our family. The community is welcoming and the teachings are life-changing.",
    role: "Guest",
  },
  {
    id: 2,
    name: "Kyle Doe",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format",
    testimonial:
      "This church has been a blessing to our family. The community is welcoming and the teachings are life-changing.",
    role: "Church Member Pastor",
  },
  {
    id: 3,
    name: "Sam Meltmer",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format",
    testimonial:
      "This church has been a blessing to our family. The community is welcoming and the teachings are life-changing.",
    role: "Musician",
  },
  {
    id: 4,
    name: "Alicja Khan",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format",
    testimonial:
      "This church has been a blessing to our family. The community is welcoming and the teachings are life-changing.",
    role: "Friend",
  },
];

// Fetch testimonials from Supabase
export const fetchTestimonials = async (): Promise<Testimonial[]> => {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching testimonials:', error);
      return [];
    }

    // Transform Supabase data to match frontend format
    return (data || []).map((item: any) => ({
      id: item.id,
      name: item.name,
      image: item.profile_url || 'https://via.placeholder.com/150',
      testimonial: item.message,
      role: item.role || 'Member',
      created_at: item.created_at,
    }));
  } catch (error) {
    console.error('Error in fetchTestimonials:', error);
    return [];
  }
};

// Validate image size (max 500KB)
export const validateImageSize = (file: File): boolean => {
  const maxSize = 500 * 1024; // 500KB in bytes
  return file.size <= maxSize;
};

// Upload image to Supabase Storage
export const uploadImage = async (file: File): Promise<string | null> => {
  try {
    // Validate file size
    if (!validateImageSize(file)) {
      throw new Error('Image size must be less than 500KB');
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `testimonial-images/${fileName}`;

    {/* data */}
    const { error } = await supabase.storage
      .from('testimonials')
      .upload(filePath, file);

    if (error) {
      console.error('Error uploading image:', error);
      return null;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('testimonials')
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  } catch (error) {
    console.error('Error in uploadImage:', error);
    return null;
  }
};

// Submit testimonial to Supabase
export const submitTestimonial = async (
  formData: TestimonialFormData
): Promise<{ success: boolean; error?: string }> => {
  try {
    let imageUrl: string | null = null;

    // Handle image upload or URL
    if (formData.image) {
      if (typeof formData.image === 'string') {
        // It's a URL
        imageUrl = formData.image;
      } else {
        // It's a File object
        imageUrl = await uploadImage(formData.image);
        if (!imageUrl) {
          return { success: false, error: 'Failed to upload image' };
        }
      }
    }

    // Insert into database
    const { error } = await supabase.from('testimonials').insert([
      {
        name: formData.name,
        role: formData.role,
        message: formData.message,
        profile_url: imageUrl,
      },
    ]);

    if (error) {
      console.error('Error inserting testimonial:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    console.error('Error in submitTestimonial:', error);
    return { success: false, error: error.message || 'Unknown error occurred' };
  }
};

// Delete testimonial from Supabase (for admin use)
export const deleteTestimonial = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting testimonial:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteTestimonial:', error);
    return false;
  }
};