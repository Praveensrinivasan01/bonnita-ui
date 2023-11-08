import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// ... (Other imports and code)

const ProductCarousel = ({ products, addtofav }) => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3, // Number of slides to show at once
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024, // Adjust settings for medium screens
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 640, // Adjust settings for small screens
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    };
  
    const carouselItemStyle = "p-4"; // Apply padding using Tailwind CSS classes
  
    return (
      <div>
        <Slider {...settings}>
          {products.map((prod, index) => (
            <div key={index} className={carouselItemStyle}>
              <div className="border rounded-lg p-4">
                <img
                  src={prod.imageSrc}
                  alt={prod.PRODUCTNAME}
                  className="w-48 h-48 mx-auto" // Adjust image size
                />
                <div className="text-center">
                  <span className="font-bold text-lg mt-2"> {/* Adjust text size */}
                    {prod.PRODUCTNAME}
                  </span>
                  <span className="mt-2 text-sm"> {/* Adjust text size */}
                    * * * * * 2k reviews
                  </span>
                  <span className="font-bold text-lg mt-2"> {/* Adjust text size */}
                    ${prod.SELLING_PRICE}
                  </span>
                  {addtofav && (
                    <span
                      onClick={() => addtofav(prod)}
                      className="cursor-pointer text-lg" // Adjust text size
                    >
                      Heart icon
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
  };
  
  // ... (Rest of the code remains the same)
  
export default ProductCarousel;
