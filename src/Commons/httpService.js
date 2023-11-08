import HttpHandler from "../Commons/httphandler";


let server=process.env.REACT_APP_API_URL

export const AuthPost = async (url, body, key) => {
    let token;
    if (key == "admin") {
      token = sessionStorage.getItem("admin_token");
    } else if (key == "customer") {
      token = sessionStorage.getItem("customer_token");
    }
    let optionalHeaders = {
      Authorization: token ? `Bearer ${token}` : "",
    };
  
    
    let data = await HttpHandler.post(server+'/'+url, body, optionalHeaders);
    // console.log(data);
    return data;
  };


  export const AuthGet = async (url, key) => {
    let token;
    if (key == "admin") {
      token = sessionStorage.getItem("admin_token");
    } else if (key == "customer") {
      token = sessionStorage.getItem("customer_token");
    }
    let optionalHeaders = {
      Authorization: token ? `Bearer ${token}` : "",
    };
  
    let data = await HttpHandler.get(server+'/'+url, "", optionalHeaders);
    // console.log(data);
    return data;
  };
  

  
export const Get = async (url, key) => {
    let data = await HttpHandler.get(server+'/'+url, "", {});
    return data;
  };
  
  export const Post = async (url, body, key) => {
    //console.log(url);
    //console.log(activeUrl);
    let data = await HttpHandler.post(server+'/'+url, body, {});
    // console.log(data);
    return data;
  };



    
  export const Delete = async (url, key) => {
    //console.log(url);
    //console.log(activeUrl);
    let data = await HttpHandler.post(server+'/'+url, "", {});
    // console.log(data);
    return data;
  };

  export const Put = async (url, body, key) => {
    let token;
    if (key == "admin") {
      token = sessionStorage.getItem("admin_token");
    } else if (key == "borrower") {
      token = sessionStorage.getItem("borrower_token");
    }
    let optionalHeaders = {
      Authorization: token ? `Bearer ${token}` : "",
    };
    console.log(url);
    let data = await HttpHandler.put(server+'/'+url, body, optionalHeaders);
    // console.log(data);
    return data;
  };






