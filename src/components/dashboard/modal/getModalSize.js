export const getModalSize = (size) => {
    switch(size){
        case "xs":
            return 320;
            break;
        case "sm":
            return 384;
            break;
        case "md":
            return 448;
            break;
        case "lg":
            return 512;
            break;
        case "xl": 
            return 576;
            break;
        case "2xl":
            return 672;
            break;
        case "3xl":
            return 768;
            break;
        case "4xl":
            return 896;
            break;
        case "5xl":
            return 1024;
            break;
        case "6xl":
            return 1184;
            break;
        
    }
}