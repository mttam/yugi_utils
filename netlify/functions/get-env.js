// Netlify function to handle environment variables
exports.handler = async function(event, context) {
  try {
    // Get the requested environment variable name from query parameters
    const name = event.queryStringParameters?.name;
    
    if (!name) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing "name" parameter' })
      };
    }

    // Get the environment variable value
    const value = process.env[name];
    
    if (value === undefined) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Environment variable not found' })
      };
    }

    // Return the value in a secure way (don't expose sensitive values)
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        name,
        value: value 
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
