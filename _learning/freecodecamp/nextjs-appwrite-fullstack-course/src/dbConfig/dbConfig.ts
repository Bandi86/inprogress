import mongoose from 'mongoose';

export async function connect() {
  
  try {    
    if (process.env.MONGO_URI === undefined) {
      console.log(process.env.MONGO_URI)
      throw new Error('The MONGO_URI environment variable undefined');
    }

    mongoose.connect(process.env.MONGO_URI!);
    const con = mongoose.connection;

    con.on('connected', () => {
      console.log(`Connected to Mongoose: ${con.collection.name}`);
    });

    con.on('error', (err) => {
      console.log(
        `MongoDB connection error. Please make sure MongoDB is running. + ${err}`
      );
      process.exit();
    });
  } catch (error) {
    console.log('Somthing goes wrong');
    console.log(error);
  }
}
