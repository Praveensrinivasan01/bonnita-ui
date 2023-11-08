import React, { useEffect, useState } from 'react';
import { CurrencyDollar, ArrowsExpand } from 'react-bootstrap-icons'
import { Get, Post } from '../../Commons/httpService'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ProductForm() {
  const navigate = useNavigate();
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(''); // Default category value
  const [subcategory, setSubcategory] = useState(''); // Default subcategory value
  const [mrp, setMrp] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [aboutItems, setAboutItems] = useState('');
  const [features, setFeatures] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [colorName, setColorName] = useState('');
  const [productCode, setproductCode] = useState('');
  const [color, setColor] = useState('#000000'); // Default color value
  const [leftSideImage, setLeftSideImage] = useState(null);
  const [frontSideImage, setFrontSidetImage] = useState(null);
  const [rightSideImage, setRightSideImage] = useState(null);
  const [backSideImage, setBackSideImage] = useState(null);
  const [dropDown, setDropDown] = useState([])
  const [dropDown2, setDropDown2] = useState([])

  const [file, setFile] = useState({
    front: [],
    back: [],
    left: [],
    right: [],
  });

  const handleFileChange = (e, type) => {
    if (e) {
      switch (type) {
        case "frontSideImage":
          setFrontSidetImage(URL.createObjectURL(e.target.files[0]))
          file?.front.pop()
          file?.front.push(e.target.files[0])
          break;
        case "backSideImage":
          setBackSideImage(URL.createObjectURL(e.target.files[0]))
          file?.back.pop()
          file?.back.push(e.target.files[0])
          break;
        case "leftSideImage":
          setLeftSideImage(URL.createObjectURL(e.target.files[0]))
          file?.left.pop()
          file?.left.push(e.target.files[0])
          break;
        case "rightSideImage":
          setRightSideImage(URL.createObjectURL(e.target.files[0]))
          file?.right.pop()
          file?.right.push(e.target.files[0])
          break;
      }
    }
};

  useEffect(() => {
    getDropDownData()
  }, [])

  const getDropDownData = async () => {
    let dropDownRes = await axios.get("http://localhost:8000/api/product/category-mapping");

    if (dropDownRes.data.statusCode === 200) {
      setDropDown(dropDownRes.data.data)
      console.log("VALUE", dropDownRes.data.data);
    }
  }

const handleCategoryChange = ( id ) => {
  setCategory(id)
  let subcategory = dropDown.find((e) => e.category_id)?.subcategories
  setDropDown2(subcategory)
}


const handleUpload = async () => {
  const formData = new FormData();
  formData.append("files[]", file.front[0]);
  formData.append("files[]", file.back[0]);
  formData.append("files[]", file.left[0]);
  formData.append("files[]", file.right[0]);

  const isFormDataValid = !Array.from(formData.values()).some(
    (value) => value === null || value === undefined
  );
  if (isFormDataValid) {
    try {
      
      const response = await axios.post(
        `http://localhost:8000/api/product/upload-product-image/${undefined}`, formData);

      console.log("response",response)
      if (response?.data?.statusCode == 200) {

        const productData = {
          product_code: productCode,
          name:productName,
          product_description:description,
          category_id:category,
          subcategory_id:subcategory,
          product_mrp:mrp,
          product_selling_price:price,
          product_quantity:quantity,
          product_features: features,
          product_about: aboutItems,
          product_size:length+'/'+width,
          product_color:color,
          product_image_id:response.data.image.id,
          product_color_name: colorName,
        };

        let resp = await axios.post(`http://localhost:8000/api/product/add-product`, productData)
         if (resp.data.statusCode == 200) {
           //  navigate("admin/products");
              }
            }else{
              console.log("image upload Failed");
            }
  }catch{
    console.log('error')
  }}else {
      alert("Please fill all fields");
    }
}

console.log("CHECK", category)

  return (
    <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
        <div className="text-gray-600">
          <p className="font-medium text-lg">Products Details</p>
          <p>Please fill out all the fields.</p>

          <div className='mt-4'>
            <label className="block">
              <span className="sr-only">Choose Front Side</span>
              <input className='product-image-input'
                accept="image/*"
                onChange={(e) => handleFileChange(e, "frontSideImage")}
                type="file"
                class="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-md file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-500 file:text-white
                            hover:file:bg-blue-600
                            "
              />  </label>
          </div>

          <div className='mt-4'>
            <label className="block">
              <span className="sr-only">Choose Back Side</span>
              <input className='product-image-input'
                accept="image/*"
                onChange={(e) => handleFileChange(e, "leftSideImage")}
                type="file"
                class="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-md file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-500 file:text-white
                            hover:file:bg-blue-600
                            "
              />  </label>
          </div>

          <div className='mt-4'>
            <label className="block">
              <span className="sr-only">Choose Left Side</span>
              <input className='product-image-input'
                accept="image/*"
                onChange={(e) => handleFileChange(e, "backSideImage")}
                type="file"
                class="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-md file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-500 file:text-white
                            hover:file:bg-blue-600
                            "
              />  </label>
          </div>

          <div className='mt-4'>
            <label className="block">
              <span className="sr-only">Choose Right Side</span>
              <input className='product-image-input'
                  accept="image/*"
                onChange={(e) => handleFileChange(e, "rightSideImage")}
                  type="file"
                  class="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-md file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-500 file:text-white
                            hover:file:bg-blue-600
                            "
                />  </label>
          </div>

          <div className='mt-2'> 
            {frontSideImage && <img className="  rounded-xl sm:w-48 sm:h-48 lg:w-60 lg:h-60" src={frontSideImage} alt="Image " />}
          </div>
          <div className='mt-2 d-flex'>
            {leftSideImage && <img className="rounded-xl sm:w-20 sm:h-20 lg:w-20 lg:h-20" src={leftSideImage} alt="Image Description" />}
            {backSideImage && <img className="rounded-xl sm:w-20 sm:h-20 lg:w-20 lg:h-20" src={backSideImage} alt="Image Description" />}
            {rightSideImage && <img className="rounded-xl sm:w-20 sm:h-20 lg:w-20 lg:h-20" src={rightSideImage} alt="Image Description" />}
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
            <div className="md:col-span-5">
              <label className="block mb-2 text-sm font-medium text-gray-900">Product Name</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder='Product Name'
              />
            </div>

            <div className="md:col-span-5">
              <label className="block mb-2 text-sm font-medium text-gray-900">Description</label>
              <textarea
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write products thoughts here..."
              />
            </div>

            <div className="md:col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-900">Product Code</label>
              <input
                type="text"
                value={productCode}
                onChange={(e) => setproductCode(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder='Code'
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900">Select Category</label>
              <select
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value={null}>Choose a category</option>
                {
                  dropDown.map((e) => {
                    return <option value={e?.category_id}>{e?.category_name}</option>
                  })
                }
              </select>
            </div> 

            <div className="md:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900">Select Sub Category</label>
              <select
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value={null}>Choose a Subcategory</option>
                {
                  dropDown2.map((e) => {
                    return <option value={e?.subcategory_id}>{e?.subcategory_name}</option>
                  })
                }
              </select>
            </div>

            <div className="md:col-span-5">
              <label className="block mb-2 text-sm font-medium text-gray-900">Features</label>
              <textarea
                rows="4"
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write about features here..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900">MRP</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <CurrencyDollar />
                </div>
                <input
                  type="text"
                  value={mrp}
                  onChange={(e) => setMrp(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                  placeholder="2000"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900">Price</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <CurrencyDollar />
                </div>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                  placeholder="2000"
                />
              </div>
            </div>

            <div className="md:col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-900">Quantity</label>
              <div className="h-10 w-28 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                <button tabIndex="-1" htmlFor="quantity" className="cursor-pointer outline-none focus:outline-none border-r border-gray-200 transition-all text-gray-500 hover:text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="0"
                  className="px-2 text-center appearance-none outline-none text-gray-800 w-full bg-transparent"
                />
                <button tabIndex="-1" htmlFor="quantity" className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-500 hover:text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2 fill-current" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="md:col-span-5">
              <label className="block mb-2 text-sm font-medium text-gray-900">About Items</label>
              <textarea
                rows="4"
                value={aboutItems}
                onChange={(e) => setAboutItems(e.target.value)}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write about product here..."
              />
            </div>

            <div className="md:col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-900">Length</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <ArrowsExpand />
                </div>
                <input
                  type="text"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                  placeholder="2000"
                />
              </div>
            </div>

            <div className="md:col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-900">Width</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <ArrowsExpand className='rotate-90' />
                </div>
                <input
                  type="text"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                  placeholder="2000"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900">Color Name</label>
              <input
                type="text"
                value={colorName}
                onChange={(e) => setColorName(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder='Color Name'
              />
            </div>

            <div className="md:col-span-1">
              <label className="block mb-2 text-sm font-medium text-gray-900">Color</label>
              <div className='rounded overflow-hidden'>
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  width={10}
                  className="h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                  placeholder='Product Name'
                />
              </div>
            </div>

            <div className="md:col-span-5 text-right">
              <div className="inline-flex items-end">
                <button  type='submit' onClick={(e)=>{handleUpload()}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductForm;
