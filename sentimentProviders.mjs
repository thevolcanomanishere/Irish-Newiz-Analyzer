
import AWS from 'aws-sdk'

//Setup AWS
AWS.config.loadFromPath("./AWSSecrets.json");

const awsComprehend = new AWS.Comprehend();

export const getAmazonSentiment = (text) => {
  return new Promise((resolve, reject) => {
    awsComprehend.detectSentiment(
      { LanguageCode: "en", Text: text },
      (err, data) => {
        if (err) reject(err);
        if (data) {
          resolve(data.Sentiment);
        }
      }
    );
  });
};