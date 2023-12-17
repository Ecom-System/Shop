import { Carousel } from '@mantine/carousel';
import { Center, Image } from '@mantine/core';
import { useRef, useState } from 'react';
import { createStyles, NumberInput, NumberInputHandlers, ActionIcon } from '@mantine/core';
import { IconPlus, IconMinus } from '@tabler/icons-react';

import Cookies from 'js-cookie';
import { axios } from 'src/lib/axios';
import router from 'next/router';

const useStyles = createStyles((theme) => ({
    wrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: `${"1px"} ${theme.spacing.xs}`,
      borderRadius: theme.radius.sm,
      border: `${"1px"} solid ${
        "white"
      }`,
      '&:focus-within': {
        borderColor: theme.colors[theme.primaryColor][6],
      },
    },
  
    control: {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      border: `${"1px"} solid ${
        theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[3]
      }`,

    },
  
    input: {
      textAlign: 'center',
      paddingRight: `${theme.spacing.sm} !important`,
      paddingLeft: `${theme.spacing.sm} !important`,
      height: "40px",
      flex: 1,
    },
  }));
  
 



const images = ['/p1.jpg', '/p2.jpg', '/p3.jpg','/p1.jpg', '/p2.jpg', '/p3.jpg','/p1.jpg', '/p2.jpg', '/p3.jpg','/p1.jpg', '/p2.jpg', '/p3.jpg','/p1.jpg', '/p2.jpg', '/p3.jpg','/p1.jpg', '/p2.jpg', '/p3.jpg','/p1.jpg', '/p2.jpg', '/p3.jpg','/p1.jpg', '/p2.jpg', '/p3.jpg','/p1.jpg', '/p2.jpg', '/p3.jpg','/p1.jpg', '/p2.jpg', '/p3.jpg','/p1.jpg', '/p2.jpg', '/p3.jpg','/p1.jpg', '/p2.jpg', '/p3.jpg','/p1.jpg', '/p2.jpg', '/p3.jpg','/p1.jpg', '/p2.jpg', '/p3.jpg','/p1.jpg', '/p2.jpg', '/p3.jpg','/p1.jpg', '/p2.jpg', '/p3.jpg'];

export default function Pixel6a() {

    const { classes } = useStyles();
  const handlers = useRef<NumberInputHandlers>(null);
  const [value, setValue] = useState<number | ''>(1);
  const slides = images.map((url) => (
    <Carousel.Slide key={url}>
      <Image src={url} />
    </Carousel.Slide>
  ));


  const handleAddToCart = async function (productid : number) {
    const isLoggedIn = Cookies.get('email');
    if (isLoggedIn === "undefined" || !isLoggedIn) {
      router.push('/login');
      return;
    }
      const cartResponse = await axios.post('/cartadd', {email:isLoggedIn,
        product:productid});
  };
  
  const handleCart = async () =>  {
    // if(Cookies.get("email")) {
    //     const newElement = {
    //     email: Cookies.get('email'),
    //     account: Cookies.get('account'), 
    //     type: 0, 
    //     quantity: 1, 
    //     price: 40000, 
    //   };
      var i: any = 0;
      for (i = 0; i< (value as any); i++) {
        try {
          handleAddToCart(1);
          // const response = await axios.post('/addCart', newElement);
          // console.log(response.data.success);
          // if (response.data.success) {
          //   console.log("yeeeee")
          // } else {
          //   console.log(response.data.message)
          //   console.log('Invalid!!');
          // }
        } catch (error) {
          console.log(error);
          // Handle cart error
        }
      }
  };
  return (
    <div className='main4'>
        <p style={{fontSize : '65px'}}>Pixel 6a</p>
        <div className='main5'>
            <Carousel maw={600} mx="auto">
                {slides}
            </Carousel>
        </div>
        <div className='description'>
            <p><b>Price : </b> 40000tk</p>
            <div style={{marginBottom : "15px"}}>Google Pixel 6a was officially announced on May 11, 2022. The smartphone comes with 6.1 inches OLED display size and it features IP67 dust/water resistant.
            Google Pixel 6a was officially announced on May 11, 2022. The smartphone comes with 6.1 inches OLED display size and it features IP67 dust/water resistant.</div>
        <div style={{margin : "10px"}}> <b><small>Quantity</small></b> </div>
        <div style={{width : "200px", height: "50px"}}>
        <div className={classes.wrapper}><ActionIcon<'button'>
        size={28}
        variant="transparent"
        onClick={() => handlers.current?.decrement()}
        className={classes.control}
        onMouseDown={(event) => event.preventDefault()}
      >
        <IconMinus size="1rem" color='black' stroke={1.5} />
      </ActionIcon>

      <NumberInput
        variant="unstyled"
        handlersRef={handlers}
        value={value as any}
        onChange={setValue as any}
        classNames={{ input: classes.input }}
      />

      <ActionIcon<'button'>
        size={28}
        variant="transparent"
        onClick={() => handlers.current?.increment()}
        className={classes.control}
        onMouseDown={(event) => event.preventDefault()}
      >
        <IconPlus size="1rem" color='black' stroke={1.5} />
      </ActionIcon>
    </div>
    </div>
    <div onClick={handleCart}  style={{backgroundColor : "#8EAC50", color : "white", height: "40px", padding: "9px", textAlign: "center", borderRadius : "30px", marginTop : "20px", marginRight : "20px"}}> Add to Cart </div>
    </div>
    
    </div>
  );
}