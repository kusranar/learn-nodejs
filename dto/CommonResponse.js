class CommonResponse{
    constructor(responseCode, responseMessage, data){
        this.responseCode = responseCode? responseCode : "01";
        this.responseMessage = responseMessage? responseMessage : "Success";
        this.data = data;
    }
}

export default CommonResponse;