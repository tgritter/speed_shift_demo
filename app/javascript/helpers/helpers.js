export const employee_data = {
    name: '',
    position: '',
    email: '',
    phone_number: '',
    salary: '',
    date_hired: '',
}

export const employee_error = {
    name: false,
    position: false,
    email: false,
    phone_number: false,
    salary: false,
    date_hired: false,
}

export const error_check = (values, error) => {

    error.name = values.name ? false : true;
    error.position = values.position ? false : true;
    error.email = values.email && email_validate(values.email) ? false : true;
    error.phone_number = values.phone_number && phone_number_validate(values.phone_number) ? false : true;
    error.salary = values.salary ? false : true;
    error.date_hired = values.date_hired ? false : true;

    return error;
}

export const format_fields = (field) => {
    var array = field.split('_');
    for(var i = 0; i < array.length; i++){
        const string = array[i].charAt(0).toUpperCase() + array[i].slice(1) 
        array[i] = string 
    }

    var new_string = array.join(' ')

    if(new_string == 'Salary'){
        new_string += ' ($)'
    }

    return new_string;
}

export const phone_input_validate = (phone_number) => {
    var string = phone_number.slice(phone_number.length - 1);
    if(string == '-'){
        string = phone_number.slice(phone_number.length - 1, phone_number.length - 2);
    }
    
    return phone_number.length <= 12 && !isNaN(string);
}

export const format_value = (field, value, input = true) => {
    if(field == 'phone_number'){
            var new_string = '';
            var new_value = value.toString().replace(/-/g, '')
            for(var i = 0; i < new_value.length; i++){
                if(i === 3){
                    new_string += '-'
                }
                if(i === 6){
                    new_string += '-'
                }
                new_string += new_value[i];
            }
            value = new_string;
        
    }
    if(field == 'salary' && !input){
        value = numberWithCommas(value)
    }
    return value;
}

const email_validate = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const phone_number_validate = (phone_number) => {
    return phone_number.length == 12;
}

const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}