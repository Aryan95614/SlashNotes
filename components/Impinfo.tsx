import {Box, Text, Heading, Flex} from '@chakra-ui/react'

interface InfoProps {  
  text?: any;
  title?: string;  
}
/*
redact_pii: true,
            content_safety: true,
            auto_highlights: true,
            auto_chapters: true,
            redact_pii_policies: ["person_name"],
            redact_pii_sub: "entity_name"


*/
export default function CardInfo({text, title}: InfoProps) {


  return (
    <>
      <div className='w-1/3' >
        <Flex>
          <Box  className="bg-[#EDE342]" p={5} shadow='md' borderWidth='1px' >
            <Heading fontSize='xl'>{title}</Heading>
            <Text fontSize='1xl' className='p-2'> {text} </Text>
            
          </Box>
        </Flex>
      </div>
    </>
  )
}
/*



*/