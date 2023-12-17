import { useEffect, useState } from 'react';
import { Table , Image, Container, Title, Paper, PasswordInput} from '@mantine/core';
import Cookies from 'js-cookie';
import { axios } from 'src/lib/axios';
import router, { useRouter } from 'next/router';
import { eCommerceAPI } from 'src/lib/eCommerceAPI';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Group, Button } from '@mantine/core';
import { useForm } from '@mantine/form';


export default function Cart() {
  const router = useRouter();
  const [elements, setElements] = useState(0);
  const [elements1, setElements1] = useState(0);
  const [elements2, setElements2] = useState(0);
  const [sum, setSum] = useState(0);
  const [open, setOpen] = useState(false);
  const form = useForm({
    initialValues: {
      secret_val: '',
    },

  });
  const handleSubmit = async (values : any) => {
    console.log(Cookies.get('secret_key') + " " + values.secret_val)
    if(Cookies.get('secret_key') == values.secret_val) {
        orderCart();
        setOpen(false);
    }else{
        setOpen(false);
    }
    
  };
  useEffect(() => {

    const mail = Cookies.get('email');
    

    const fetchCart = async () => {

        try {
            const email = Cookies.get('email');
            const response = await axios.post('/cartget', { email: email });
            const responseData = response.data;
      
            // setCnt([responseData.cnt_p1, responseData.cnt_p2, responseData.cnt_p3]);
            setElements(responseData.cnt_p1);
            setElements1(responseData.cnt_p2);
            setElements2(responseData.cnt_p3);
          } catch (err) {
            console.error('Error retrieving data: ', err);
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


   const confirmPayment = async (secret_key:string) => {
    console.log("confirm payment");
    try {
      const cnt_p1 = elements;
      const cnt_p2 = elements1;
      const cnt_p3 = elements2;
      //account to be determined
      const total_price = sum;
      //from input
      const user_email = Cookies.get('email');
    //   const accountResponse = await eCommerceAPI.get(`/get-bank-info?email=${user_email}`);
    //   if(!accountResponse.data.success){

    //     router.push('/bankinfo');
    //     return;
    //   }
      const acc_no = Cookies.get('account');
      const response = await axios.post('/checkout', {
        cnt_p1,
        cnt_p2,
        cnt_p3,
        acc_no,
        total_price,
        secret_key,
        user_email,
      });
  
      if (response.data.success) {
        console.log(response.data.message);
        //setSuccess(true);
        setTimeout(()=>{router.push('/')}, 500);
        // window.location.reload(); or router.push to redirect, chanke korte hobe
      } else {
        //wrong key or insufficient balance
        console.log(response.data.message);
        // if(response.data.message == 'Insufficient balance'){
        //   //setlowBalance(true);
        // }else if(response.data.message == 'Invalid secret key'){
        //   //setWrongKey(true);
        // }else if(response.data.message == 'No product found in the cart'){
        //   //setEmptyCart(true);
        // }
        // else{
        //   //setError(true);
        // }
      }
    } catch (error) {
      //setError(true);
      console.error('Error during checkout:', error);
    }
  }
//   const checkOut = async () => {
//     setModalOpen(true);
//   };
//   const handleModalClose = async () => {
//     setModalOpen(false);
//    }
  
  const buy_now = async (newElement : any) => {
    try {
 
      const response = await axios.post('/updateBalance', newElement);
      console.log(response.data.success);
      if (response.data.success) {
        console.log("balance update done");
        // const response2 = await axios.post('/placeOrder', newElement);
        confirmPayment('secret');
        // if (response2.data.success) 
        //   router.reload();
        // else
        //   console.log("order hoynai")
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
        <Modal opened={open} onClose={()=>{setOpen(false)}} centered>
        <div>
       <form onSubmit={form.onSubmit(handleSubmit)}>
      <Container size={520} my={60}>
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 500 })}
      >
        <p style={{fontSize : "30px"}}>Confirm Secret Key!</p>
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <PasswordInput label="Secret Key" placeholder="Your key" required mt="md"  {...form.getInputProps('secret_val')} />
        
        <Button fullWidth mt="xl" type='submit'>
          Submit
        </Button>
      </Paper>
    </Container>
    </form>
    </div>
        </Modal>
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
        <div onClick={()=>{setOpen(true)}} style={{ backgroundColor : "#8EAC50", color : "white", height: "40px", padding: "9px", textAlign: "center", borderRadius : "30px", marginTop : "20px", marginLeft : "700px", width : "200px"}}> Place Order </div>

    </div>
    );
}