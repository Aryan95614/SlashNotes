

/* cd slashnotes <=>  npx @sanity/cli start*/

import type { NextPage } from 'next'
import Link from 'next/link'
import Header from '../components/Header'
import { sanityClient, urlFor } from '../sanity'
import { Post } from '../typings'
import {VStack, Text, Button, WrapItem, Wrap, Box, Heading,  FormControl, FormLabel, Input, Center, HStack} from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Formik} from 'formik';
import CardInfo from '../components/Impinfo'
interface Props {
   posts: Post[]
    
}

const Home: NextPage<Props> = (props) => {
  
  const FeymanTimer = "Feymann Timer";
  let UrlVideo = "https://bit.ly/3yxKEIY";
  let responce:string = "[----]";
  let ids:string = "";
  let status:any = 0;
  let chapters:any = [];
  
  let component:any = '';
  const [values, setValues] = useState("");
  
  function sleep(ms:any) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  async function RecursiveGetRequest() {
    sleep(10000).then(() => {
      let placeHolder = GetText(ids);
      if (status == "completed") {
        setValues(responce);
        console.log('done')
      } else {
        RecursiveGetRequest();
      }
    
    });
  }
  async function printResult(NeededLink:string) {
    let value = await GiveText(NeededLink);
    sleep(10000).then(async() => {      
      console.log(ids);
      let placeHolder = await GetText(ids);
      RecursiveGetRequest();
      
      });
      
  };
    
  

  let placeHolder:any="";
  
  let ConvertStringToHTML = function (str:string) {
    let parser = new DOMParser();
    let doc = parser.parseFromString(str, 'text/html');
    return doc.body;
 };
  function Timer() {
      const [seconds, setSeconds] = useState(0);
      const [isActive, setIsActive] = useState(false);
      let bogs = []
      props.posts.forEach(element => {
        bogs.push(element)
      });
      function toggle() {
        setIsActive(!isActive);
      }

      function reset() {
        setSeconds(0);
        setIsActive(false);
      }

      useEffect(() => {
        let interval:any = null;
        if (isActive) {
          interval = setInterval(() => {
            setSeconds(seconds => seconds + 1);
          }, 1000);
        } else if (!isActive && seconds !== 0) {
          clearInterval(interval);
        }
        return () => clearInterval(interval);
      }, [isActive, seconds]);

      return (
        <Box className="bg-[#EDE342]" p={5} shadow='md' borderWidth='1px'>
          <Heading fontSize='xl' >Feymann Timer</Heading>
          <Text mt={4}>{seconds}</Text>
            <Wrap spacing={4}>
              <WrapItem>
                <Button colorScheme='teal' variant='ghost' onClick={toggle}>
                  {isActive ? 'Pause' : 'Start'}
                </Button>
              </WrapItem>
              <WrapItem>
                <Button colorScheme='teal' variant='ghost' onClick={reset}>
                  Reset
                </Button>
              </WrapItem>
            </Wrap>
        </Box>
      );}; 
  function Form() {
    return (
        <>
          <Formik
          initialValues={{ Link: ''}}
          
          onSubmit={(values, { setSubmitting }) => {
            console.log(values.Link);
            UrlVideo = values.Link;
            printResult(values.Link);
          }}
          >
            {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
           
        }) => (
            <form onSubmit={handleSubmit}>
                <FormControl>
                    <FormLabel>Audio Url</FormLabel>
                    <Input type="Link"
                    name="Link" onChange={handleChange} value={values.Link}/>
                    <Button
                        mt={4}
                        colorScheme='teal'
                        type='submit'
                    >
                        Submit
                    </Button>
                </FormControl>
            </form>
        )}
          </Formik>
        </>
    )
   
  }
  async function GiveText(audio_urls:string) {
    const assembly = axios.create({
      baseURL: "https://api.assemblyai.com/v2",
      headers: {
          authorization: "a65b766c60214adf8c0e12f2cb7cf8bb",
          "content-type": "application/json",
          },
    });
    let something:any="";
      assembly
        .post("/transcript", {
            audio_url: audio_urls,
            auto_chapters: true,
            //content_safety: true,
            
        })
        .then((res) => {
          console.log(res.data);
          something=res.data.id;
          ids=res.data.id;
          responce = res.data.text;
          console.log(something);
          chapters = res.data.chapters;
          return res.data.id;
        })
        .catch((err) => console.error(err));
  }
  function GetText(id:string) {
    
    const assembly = axios.create({
      baseURL: "https://api.assemblyai.com/v2",
      headers: {
          authorization: "a65b766c60214adf8c0e12f2cb7cf8bb",
          "content-type": "application/json",
          },
    });
    assembly
    .get(`/transcript/${id}`)
    .then((res:any) => {
      if (res.data.status == "completed"){
        setValues(res.data.text);
      }      
      status = res.data.status;
      console.log(status);
      return res
    }).catch((err:any) => console.error(err));
    
  };
  
   return (
    <>
      {/* */}
      <Header />     
      
         
      <div>  
      
          <VStack>
          
            {/* Feymann Technique */}
            <Text fontSize='3xl' className='p-2'>Tips and Tricks</Text>
            
            <Center>
              <div className='p-5'><Box><Timer /></Box></div>
              <div className='p-5'><Form /></div>
              <div className='p-5'>
                  {values!=""  ? (
                  <CardInfo title='Information' text={"The Text Is:" + values}/>
                  {chapters.map((element:any) => {
                    <Text> Chapter: {element}</Text>
                  })}
                ) : (
                  <Text fontSize='1xl'></Text>
                )}
              </div>
            </Center>
            {/* Link Stuff */}
            <HStack>
                {props.posts.map(post=>(       
                      <div className='w-80'>          
                            <Link key={post._id} href={`/post/${post.slug.current}`}>
                                      <div className='group cursor-pointer border rounded-lg overflow-hidden p-1'>
                                      <img className='h-60 w-full object-cover group-hover:scale-105 duration-200 ease-in-out' src={urlFor(post.mainImage).url()!} alt="" />
                                        <div className='flex justify-between p-4 bg-white'>
                                            <div>
                                              <p className='text-lg font-bold'>{post.title}</p>
                                              <p className='text-xs'>{post.description} by {post.author.name}</p>                                                              
                                            </div>
                                            <img className='h-12 w-12 rounded-full' src={urlFor(post.author.image).url()!} alt="" />
                                        </div>
                                      </div>
                            </Link>  
                          </div>         
                          ))}
              </HStack>        
            
          </VStack>
        </div>
      </>
   )
}

export default Home

export const getServerSideProps = async () => {
   const query = `*[_type == "post"]{
      _id,
      title,
      author->{
      name,
      image
    },
    description,
    mainImage,
    slug
    }`

   const posts = await sanityClient.fetch(query)

   return {
      props: {
         posts
      }
   }
}
