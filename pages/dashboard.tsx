import { useEffect, useState } from 'react';
import { Table , Image} from '@mantine/core';
import Cookies from 'js-cookie';
import { axios } from 'src/lib/axios';
import router from 'next/router';
import { showNotification } from '@mantine/notifications';

export default function Dashboard() {
  
  const handleClick6a = () => {
	  router.push('./pixel6a')   
	};
  const handleClick6aPro = () => {
	  router.push('./pixel6pro')   
	};
  const handleClick6 = () => {
	  router.push('./pixel6')   
	};
  const handleCart6 = async (elements : any) =>  {
    if(Cookies.get("email")) {
        const newElement = {
        email: Cookies.get('email'),
        account: Cookies.get('account'), 
        type: 2, 
        quantity: 1, 
        price: 57000, 
      };
        try {
          const response = await axios.post('/addCart', newElement);
          console.log(response.data.success);
          if (response.data.success) {
            console.log("yeeeee")
          } else {
            console.log(response.data.message)
            console.log('Invalid!!');
          }
        } catch (error) {
          console.log(error);
          // Handle cart error
        }
      }
    
      //
    else {
      //
    }

  };
  const handleCart6a = async (elements : any) =>  {
    if(Cookies.get("email")) {
        const newElement = {
        email: Cookies.get('email'),
        account: Cookies.get('account'), 
        type: 0, 
        quantity: 1, 
        price: 40000, 
      };
        try {
          const response = await axios.post('/addCart', newElement);
          console.log(response.data.success);
          if (response.data.success) {
            console.log("yeeeee")
          } else {
            console.log(response.data.message)
            console.log('Invalid!!');
          }
        } catch (error) {
          console.log(error);
          // Handle cart error
        }
      }
    
      //
    else {
      //
    }

  };
  const handleCart6pro = async () =>  {
    if(Cookies.get("email")) {
        const newElement = {
        email: Cookies.get('email'),
        account: Cookies.get('account'), 
        type: 1, 
        quantity: 1, 
        price: 70000, 
      };
        try {
          const response = await axios.post('/addCart', newElement);
          console.log(response.data.success);
          if (response.data.success) {
            console.log("yeeeee")
          } else {
            console.log(response.data.message)
            console.log('Invalid!!');
          }
        } catch (error) {
          console.log(error);
          // Handle cart error
        }
      }
    
      //
    else {
      //
    }

  };

  const handleAddToCart = async function (productid : number) {
    const isLoggedIn = Cookies.get('email');
    if (isLoggedIn === "undefined" || !isLoggedIn) {
      router.push('/login');
      return;
    }
      console.log(productid);
      showNotification({
        title: "Added to cart",
        message: "Added to cart successful",
        color: "teal",
        autoClose: 5000,
    });
      const cartResponse = await axios.post('/cartadd', {email:isLoggedIn,
        product:productid});
  };

  return (
    <div>
      <div className='main3'><div style={{color : 'greenyellow'}}>Google</div> <div>Samsung</div> <div>Oppo</div> <div>Vivo</div> <div>Apple</div></div>
    <div className='main2'>
      <div className='obj'><div className='itm'><Image src='p1.jpg'></Image>
      
      </div><p onClick={handleClick6a}>Pixel 6a</p>
      <div className='hl'></div>
      <div className='price_shop'><div className='price_shop_div'>Price: 40000tk </div><div className='round_div' onClick={() => handleAddToCart(1)}> Add to Cart</div> </div>
      <div className='desc'>
        Google Pixel 6a was officially announced on May 11, 2022. The smartphone comes with 6.1 inches OLED display size and it features IP67 dust/water resistant.
      </div>
      </div>
      <div className='obj'><div className='itm'><Image src='p10.jpg'></Image>
      
      </div><p onClick={handleClick6aPro}>Pixel 6 Pro</p>
      <div className='hl'></div>
      <div className='price_shop'><div className='price_shop_div'>Price: 70000tk </div><div className='round_div' onClick={() => handleAddToCart(2)}> Add to Cart</div> </div>
      <div className='desc'>
      The Pixel 6 Pro has been totally redesigned and features dual-tone glass finishes, along with a camera array that sits in a bar all the way across the rear of the phone.
      </div>
      </div>
      <div className='obj'><div className='itm'><Image src='p20.jpg'></Image>
      
      </div><p onClick={handleClick6}>Pixel 6</p>
      <div className='hl'></div>
      <div className='price_shop'><div className='price_shop_div'>Price: 57000tk </div><div className='round_div' onClick={() => handleAddToCart(3)}> Add to Cart</div> </div>
      <div className='desc'>
      After a brief hiatus in 2020, Google returned this year to the flagship smartphone scene with the Pixel 6 Pro.  size and it features IP67 dust/water resistant.
      </div>
      </div>
    </div>
    </div>
  );
}
