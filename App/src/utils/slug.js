import slugify from "slugify";

export const createSlug = (title) => {
   		
    const slug  = slugify(title, {
        replacement: '-',  
        remove: /[*+~.()'"!:@]/g,
        strict: true,
        lower: true,
        locale: 'vi',      
        trim: true  
    });
    return slug;  
};