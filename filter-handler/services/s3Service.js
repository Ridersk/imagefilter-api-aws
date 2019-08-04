const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-1'
})

const BUCKET = 'nanoservices-images-filter-ridersk'

const s3 = new AWS.S3();

const getObject = (bucket, key) => {
    return new Promise((resolve, reject) => {
        s3.getObject({
            Bucket: bucket,
            Key: key
        }, (err, data) => {
            if (err) {
                return reject(err)
            }
            return resolve(data.Body);
        })
    })
}


const putObject = (buffer, filename) => {
    return new Promise((resolve, reject) => {
        s3.putObject({
            Bucket: BUCKET,
            Key: 'filter-' + filename,
            Body: buffer
        }, (err, data) => {
            if (err) {
                return reject(err)
            }
            return resolve(data.Body);
        })
    })
}

module.exports = {
    getObject,
    putObject
}