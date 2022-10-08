
import { Handler } from "@netlify/functions";

const handler  = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
       message: "netlify/functions test", 
       name:'Robin', 
       email:'hduhwan@gmail.com'
      }),
  };
};

export { handler };