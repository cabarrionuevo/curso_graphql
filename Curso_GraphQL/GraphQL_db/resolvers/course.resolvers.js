const Course = require('../models/course');

module.exports = {
    
    Query: {
        async getCourses(obj,{page,limit}){
                                    
            let courses = Course.find();
            
            if (page !== undefined){
                courses = Course.find().limit(limit).skip((page -1)* limit);
            }

            return await courses;
        },
        async getCourse(obj, {id} ){
            
            cursinho = await Course.findById(id);
            return cursinho;
        }
    },
    Mutation: {
        async addCourse(obj,{ input }){
            // const { title, views } = input;
            // const id = String(courses.length + 1);        
            // const course = {id, ...input}; //equivalente a: const course = {id,title,views};
            const cursito = new Course(input);
            //Le decimos a la función que termine esta operación
            await cursito.save();

            return cursito;
        },
        async updateCourse(obj,{ id,input }){

            const cursinho = await Course.findByIdAndUpdate(id,input);            
            return cursinho;

        },
        async deleteCourse(obj, {id}){

            await Course.deleteOne( {_id:id} )
            // courses = courses.filter((course) => course.id != id);

            return {
                message: `El curso ${id} fue boleteado`
            }
        }
    }

}