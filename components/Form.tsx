import {
    FormControl,
    FormLabel,
    Button,
    Input,
  } from '@chakra-ui/react'
import { Formik} from 'formik';

export default function Form() {
    return (
        <>
          <Formik
          initialValues={{ Link: ''}}
          
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
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
            /* and other goodies */
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