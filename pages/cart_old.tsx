import { useEffect, useState } from 'react';
import { Table , Image} from '@mantine/core';
import Cookies from 'js-cookie';
import { axios } from 'src/lib/axios';
import { useRouter } from 'next/router';

export default function Cart() {
  const router = useRouter();
  const [elements, setElements] = useState(0);
  const [elements1, setElements1] = useState(0);
  const [elements2, setElements2] = useState(0);
  const [sum, setSum] = useState(0);

  useEffect(() => {

    const mail = Cookies.get('email');
    

    const fetchCart = async () => {
      try {
        const val=0;
        const response = await axios.get(`/getCart?email=${mail}&type=${val}`);
        setElements(response.data.value);
        //setSum(sum + elements*40000);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
      try {
        const val=1;
        const response = await axios.get(`/getCart?email=${mail}&type=${val}`);
        setElements1(response.data.value);
        //setSum(sum + elements1*70000)
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
      try {
        const val=2;
        const response = await axios.get(`/getCart?email=${mail}&type=${val}`);
        setElements2(response.data.value);
        //setSum(sum + elements2*57000)
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  },[]);

  useEffect(() => {
    setSum(elements*40000 + elements1*70000 + elements2*57000);
  },[elements, elements1, elements2]);

 const ths = (
    <tr>
    <th>Image</th>
      <th>Product</th>
      <th>Quantity</th>
      <th>Price</th>
 
    </tr>
  );

  const buy_now = async (newElement : any) => {
    try {
 
      const response = await axios.post('/updateBalance', newElement);
      console.log(response.data.success);
      if (response.data.success) {
        console.log("balance update done");
        const response2 = await axios.post('/placeOrder', newElement);
        if (response2.data.success) 
          router.reload();
        else
          console.log("order hoynai")
      } else {
        console.log(response.data.message)
        console.log('kinte problem');
      }
    } catch (error) {
      console.log(error);
      console.log("preityyyyy");
    }
  };

  const orderCart = async () =>  {
  
    if(Cookies.get("email")) {
        const newElement = {
        email: Cookies.get('email'),
        account: Cookies.get('account'),
        tot: sum,
        };
        try {
          
          const response = await axios.post('/checkBalance', newElement);
          console.log(response.data.success);
          if (response.data.success) {
            console.log("taka ache")
            buy_now(newElement);
          } else {
            
            console.log('no money');
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


  
  return (
    <div className='main11'>
        <div style={{textAlign: "center", marginTop : "200px"}}>
			<p>My Cart</p>
		</div>
        <table className='myTable'>
            {ths}
            {(elements as number) !== 0 && (
                <tr>
                    <td> <div style={{width : "150px"}}><Image src = '/p1.jpg'></Image></div> </td>
                    <td> Pixel 6a</td>
                    <td>{elements}</td>
                    <td>{(elements as any)*40000}</td>
                </tr>
            )}
            {(elements1 as number) !== 0 && (
                <tr>
                    <td> <div style={{width : "150px"}}><Image src = '/p11.jpg' ></Image></div> </td>
                    <td> Pixel 6pro</td>
                    <td>{elements1}</td>
                    <td>{(elements1 as any)*70000}</td>
                </tr>
            )}
            {(elements2 as number) !== 0 && (
                <tr>
                    <td> <div style={{width : "150px"}}><Image src = '/p22.jpg' ></Image></div> </td>
                    <td> Pixel 6</td>
                    <td>{elements2}</td>
                    <td>{(elements2 as any)*57000}</td>
                </tr>
            )}
            {((elements2 as number)+(elements as number)+(elements1 as number)) !== 0 && (
                <tr>
                    <td></td>
                    <td> <b>Total : </b></td>
                    <td>{(elements2 as unknown as number)*57000+(elements  as unknown as number)*40000+(elements1  as unknown as number)*70000}/-</td>
                    <td></td>
                </tr>
            )}
        </table>
        <div onClick={orderCart} style={{ backgroundColor : "#8EAC50", color : "white", height: "40px", padding: "9px", textAlign: "center", borderRadius : "30px", marginTop : "20px", marginLeft : "700px", width : "200px"}}> Place Order </div>

    </div>
    );
}