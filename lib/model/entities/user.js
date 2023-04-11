class User {
    constructor(id, fName, lName, email, password, phone, status, type) {
        this.id = id;
        this.fName = fName;
        this.lName = lName;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.status = status;
        this.type = type;


    }
   static  FromJson(data) {
        return new User(data.id, data.fName, data.lName, data.email, data.password, data.phone, data.status, data.type);
    }
    toJson() {
        return {
            id: this.id,
            fName: this.fName,
            lName: this.lName,
            email: this.email,
            password: this.password,
            phone: this.phone,
            status: this.status,
            type: this.type,
        };
    }
}