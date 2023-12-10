import React, { useEffect, useState } from "react";
// import '../../src/Assets/css/style.css'
import { Link } from "react-router-dom";
const Shop = () => {
  const [products, setProducts] = useState([]);
  const [unfiltered, setUnfiltered] = useState([]);
  const [filters, setFilters] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedValueMaterial,setSelectedValueMaterial]=useState("")
  let getALLproducts = () => {
    let dummydata = [
      {
        "S.NO": 1,
        "PRODUCT CODE": "CMDCLB1",
        PRODUCTNAME: "MEN'S DOUBLE COMPARTMENT LAPTOP BAG",
        COLOUR: "MATT BROWN",
        "DIMENSIONS(L*W)": "31*40CM",
        "ABOUT THIS ITEMS":
          "Material type: leather\nSingle main compartment with zipper closur; Laptop pouch; 2 pockets for mobile and charger; additional zipper pocket; 1 Exterior zipper pocket with flap in front; 1 Exterior zipper pocket in the back.\nAll festive season bring a smile on him face by gifting him this absolutely classy.",
        "PRODUCT FEATURES":
          "Double main compartment with zipper closur; Laptop pouch; 2 pockets  for mobile and charger; additional zipper pocket; 1 Exterior zipper pocket with flap in front; 1 Exterior zipper pocket in the back. ",
        DESCRIPTION:
          "A wonderful companion while traveling or at the office, the bag has a deceptively spacious silhouette that can carry all your office essentials in an organized fashion. It has dual compartments for storing anything and everything. This has a separate inner padded laptop compartment along with a phone slot. Crafted with handles to hold by hand and over shoulder for hands-free experience as well.",
        MRP: 8264,
        SELLING_PRICE: 4900,
        Type: "Handbag",
        Material: "Veganleather",
        imageSrc:
          "https://clipart-library.com/image_gallery2/Shopping-Bag-PNG-HD.png",
        favourites: false,
      },
      {
        "S.NO": 2,
        "PRODUCT CODE": "CMDCLB2",
        PRODUCTNAME: "MEN'S DOUBLE COMPARTMENT LAPTOP BAG",
        COLOUR: "DARK BROWN",
        "DIMENSIONS(L*W)": "31*40CM",
        "ABOUT THIS ITEMS":
          "Material type: leather\nSingle main compartment with zipper closur; Laptop pouch; 2 pockets for mobile and charger; additional zipper pocket; 1 Exterior zipper pocket with flap in front; 1 Exterior zipper pocket in the back.\nAll festive season bring a smile on him face by gifting him this absolutely classy.",
        "PRODUCT FEATURES":
          "Double main compartment with zipper closur; Laptop pouch; 2 pockets  for mobile and charger; additional zipper pocket; 1 Exterior zipper pocket with flap in front; 1 Exterior zipper pocket in the back. ",
        DESCRIPTION:
          "A wonderful companion while traveling or at the office, the bag has a deceptively spacious silhouette that can carry all your office essentials in an organized fashion. It has dual compartments for storing anything and everything. This has a separate inner padded laptop compartment along with a phone slot. Crafted with handles to hold by hand and over shoulder for hands-free experience as well.",
        MRP: 8264,
        SELLING_PRICE: 4900,
        Type: "belt",
        Material: "Veganleather",
        imageSrc:
          "https://i.pinimg.com/originals/68/9f/4f/689f4f505d622d5dac2baea1859282bc.png",
        favourites: false,
      },
      {
        "S.NO": 3,
        "PRODUCT CODE": "CMLB001",
        PRODUCTNAME: "BELT",
        COLOUR: "DARK BROWN",
        "DIMENSIONS(L*W)": "ADJUSTABLE",
        "ABOUT THIS ITEMS":
          "Material type: leather\nThis belt is made up of Top Grain Genuine Leather which makes it long lasting than any other belts.\nDurability - We have used thick leather in this belt to ensure its longevity and durability. High quality metal buckle is used to make sure that this belt lasts for ages.",
        "PRODUCT FEATURES": "leather strap, Buckle",
        DESCRIPTION:
          "A leather belt is a classic accessory that is typically made from high-quality leather material. It features a long strip of leather with a buckle at one end and several holes at the other end to adjust the size and fit.",
        MRP: 950,
        SELLING_PRICE: 550,
        Type: "belt",
        Material: "leather",
        imageSrc:
          "https://png.pngtree.com/element_our/20190527/ourmid/pngtree-real-shot-men-s-leather-belt-image_1113261.jpg",
        favourites: false,
      },
    ];
    setProducts(dummydata);
    setUnfiltered(dummydata);
  };

  let getfilters = () => {
    let Dummyfilters = [
      {
        type: [
          { name: "All", subcategories: [] },
          { name: "Belt", subcategories: ["scrollingbelt"] },
          { name: "Bag", subcategories: ["Slingshot Bag", "One Side Bag"] },
        ],
        Material: ["Leather", "Cotton"],
      },
    ];
    setFilters(Dummyfilters);

    setFilters(Dummyfilters);
  };

  useEffect(() => {
    getALLproducts();
    getfilters();
  }, []);

  let sorter = (sortfor, selected) => {
    console.error(sortfor, selected);//last one is for which catogory is selected for the sub catogories

    if (selected == "All") {
      return setProducts(unfiltered);
    } //ask backend for this too

    let selectedproduct = [];
    const array =
      unfiltered == products
        ? unfiltered
        : products.filter((ele, i) => {
            // console.log("Checking:", ele[sortfor], selected);
            if (ele[sortfor].includes(selected)) {
              selectedproduct.push(ele);
            }
            return ele.Material.includes(selected); // Filter and return the products that match
          }); //filter be done in backend

    // console.log(array);
    setProducts(array);
  };

  let adddtofav = (pd) => {
    console.warn(pd);
  };

  console.log(products);

  const radioStyle = {
    margin: "12px 0",
  };

  const containerStyle = {
    display: "flex",
    alignItems: "center",
  };

  const sidebarStyle = {
    width: "250px",
    backgroundColor: "#f3f4f6",
    padding: "20px",
    height: "100vh",
  };

  const mainStyle = {
    flex: "1",
    backgroundColor: "#ffffff",
    padding: "20px",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
  };

  const cardStyle = {
    border: "1px solid #ccc",
    padding: "29px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const productImageStyle = {
    width: "60px",
    height: "60px",
  };

  const productNameStyle = {
    fontWeight: "bold",
  };

  const productRatingStyle = {
    marginTop: "10px",
  };

  const productPriceStyle = {
    fontWeight: "bold",
  };

  const heartIconStyle = {
    cursor: "pointer",
  };
  // console.warn(filters);

  const searchBarStyle = {
    display: "flex",
    justifyContent: "right",
    margin: "18px 0",
   
  };
  
  const searchInputStyle = {
    padding: "10px",
    width: "60%",
    borderRadius: "5px",
    border: "1px solid #ccc",
  };

    const [file, setFile] = useState(null);
  
    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };
  
    const handleUpload = async () => {
      const formData = new FormData();
      formData.append('image', file);
  
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/product/upload-image`, {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          console.log('Image uploaded successfully');
        } else {
          console.error('Image upload failed');
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    }
  
  

  return (
    <div style={containerStyle}>
      
      <div style={sidebarStyle}>
        <div>
          <span style={{ fontWeight: "bold" }}>Types of Bags</span>
        </div>

        {filters.length !== 0 &&
          filters[0]["type"].map((prod, i) => (
            <div key={i}>
              <input
                onClick={(e) => {
                  setSelectedValue(e.target.value);
                  sorter(e.target.name, e.target.value);
                }}
                type="radio"
                id={prod.name}
                name="productType"
                value={prod.name}
                checked={
                  selectedValue === prod.name ||
                  (selectedValue === "" && prod.name === "All")
                }
                style={radioStyle}
              />
              <label htmlFor={prod.name}>{prod.name}</label>
              <br />

              {selectedValue === prod.name && prod.subcategories.length > 0 && (
                <div>
                  <span style={{ fontWeight: "bold" }}>Subcategories</span>
                  {prod.subcategories.map((subcategory, j) => (
                    <div key={j}>
                      <input
                        type="radio"
                        id={subcategory}
                        name={`subcategoryType ${prod.name}`}
                        value={subcategory}
                        style={radioStyle}
                        onClick={(e) => {
                          sorter(e.target.name, e.target.value);
                        }}
                      />
                      <label htmlFor={subcategory}>{subcategory}</label>
                      <br />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

        <div style={{ marginTop: "20px" }}>
          <span style={{ fontWeight: "bold" }}>Material</span>
        </div>
        <div>
          {filters.length !== 0 &&
            filters[0]["Material"].map((material, i) => (
              <div key={i}>
                <input
                  onClick={(e) => {
                    sorter(e.target.name, e.target.value);
                    setSelectedValueMaterial(e.target.value);
                  }}
                  type="radio"
                  id={material}
                  name="materialType" // A common name for all radio buttons
                  value={material}
                  checked={
                    selectedValueMaterial === material ||
                    (selectedValueMaterial === "" && material === "All")
                  }
                  style={radioStyle}
                />
                <label htmlFor={material}>{material}</label>
                <br />
              </div>
            ))}
        </div>

        <div style={{ marginTop: "20px" }}>
          <span style={{ fontWeight: "bold" }}>Price Range</span>
        </div>
        <div>
          <input
            onClick={(e) => {
              sorter(e.target.name, e.target.value);
            }}
            type="radio"
            id="option1"
            name="Price"
            defaultChecked
            value="All"
            style={radioStyle}
          />
          <label htmlFor="option1">ALL</label>
          <br />
          <input
            onClick={(e) => {
              sorter(e.target.name, e.target.value);
            }}
            type="radio"
            id="option2"
            name="Price"
            value="100-200"
            style={radioStyle}
          />
          <label htmlFor="option2">100-200</label>
          <br />
          <input
            onClick={(e) => {
              sorter(e.target.name, e.target.value);
            }}
            type="radio"
            id="option3"
            name="Price"
            value="200-500"
            style={radioStyle}
          />
          <label htmlFor="option3">200-500</label>
          <br />
          <input
            onClick={(e) => {
              sorter(e.target.name, e.target.value);
            }}
            type="radio"
            id="option4"
            name="Price"
            value="500-900"
            style={radioStyle}
          />
          <label htmlFor="option4">500-900</label>
          <br />
          <input
            onClick={(e) => {
              sorter(e.target.name, e.target.value);
            }}
            type="radio"
            id="option4"
            name="Price"
            value="above 1000"
            style={radioStyle}
          />
          <label htmlFor="option4">Above 1000</label>
          <br />
        </div>
      </div>
      
      <div style={mainStyle}>




        <div style={gridStyle}>
          {products &&
            products.map((prod, index) => (
              <div key={index} style={cardStyle}>
                <img
                  src={prod.imageSrc}
                  alt={prod.PRODUCTNAME}
                  style={productImageStyle}
                />
                <span style={productNameStyle}>{prod.PRODUCTNAME}</span>
                <span style={productRatingStyle}>
                  * * * * * {"  "} 2k reviews
                </span>
                <span style={productPriceStyle}>${prod.SELLING_PRICE}</span>
                <span onClick={() => adddtofav(prod)} style={heartIconStyle}>
                  Heart icon
                </span>
                {/* Other product details */}
              </div>
              
            ))}
                  <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Image</button>
    </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
