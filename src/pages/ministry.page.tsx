const MinistryPage = () => (
    <div className="container mx-auto px-4 py-16">
      <h1 className="custom-h1 mb-8 text-center">Ministry</h1>
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div className="custom-box">
          <h3 className="custom-h3 mb-4">Worship Ministry</h3>
          <p className="custom-p">Leading the congregation in heartfelt worship and praise.</p>
        </div>
        <div className="custom-box">
          <h3 className="custom-h3 mb-4">Children's Ministry</h3>
          <p className="custom-p">Nurturing young hearts in faith and Biblical values.</p>
        </div>
        <div className="custom-box">
          <h3 className="custom-h3 mb-4">Youth Ministry</h3>
          <p className="custom-p">Empowering teenagers to live out their faith boldly.</p>
        </div>
        <div className="custom-box">
          <h3 className="custom-h3 mb-4">Women's Ministry</h3>
          <p className="custom-p">Building sisterhood and spiritual growth among women.</p>
        </div>
        <div className="custom-box">
          <h3 className="custom-h3 mb-4">Men's Ministry</h3>
          <p className="custom-p">Building Brotherhood and spiritual growth among men.</p>
        </div>
      </div>
    </div>
  );

export default MinistryPage;
