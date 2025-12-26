The **tokens** in those meta tags come from the *search engine services* you want to verify your site with.
You **don’t generate them yourself**—you obtain them from each service after adding your website.

Here’s how:

---

### ✅ **1. Google Site Verification**

Used for **Google Search Console** (to let Google know you own the domain).
Steps:

1. Go to [Google Search Console](https://search.google.com/search-console/).
2. Click **“Add Property”** → enter your site URL.
3. Choose the **HTML tag** verification method.
4. Google will give you a line like:

   ```html
   <meta name="google-site-verification" content="abc123XYZ..." />
   ```
5. Copy the value inside `content` (e.g., `abc123XYZ...`) and place it in:

   ```html
   <meta name="google-site-verification" content="abc123XYZ..." />
   ```

---

### ✅ **2. Microsoft/Bing Site Verification**

Used for **Bing Webmaster Tools**.
Steps:

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters/).
2. Add your site.
3. Choose the **HTML meta tag** method.
4. Bing gives you a tag like:

   ```html
   <meta name="msvalidate.01" content="DEF456UVW..." />
   ```
5. Insert it in your `<head>`:

   ```html
   <meta name="msvalidate.01" content="DEF456UVW..." />
   ```

---

### 📌 Summary Table

| Service    | Where to get token                                                                           |
| ---------- | -------------------------------------------------------------------------------------------- |
| **Google** | [Google Search Console](https://search.google.com/search-console/) → Add Property → HTML tag |
| **Bing**   | [Bing Webmaster Tools](https://www.bing.com/webmasters/) → Add Site → HTML meta tag          |

---

After adding the meta tags to your site’s `<head>` and publishing the changes,
go back to each service’s dashboard and click **Verify**.

That’s it—you’ll now have verified ownership with Google and/or Bing.
