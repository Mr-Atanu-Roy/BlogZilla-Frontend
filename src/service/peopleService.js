import {publicAxiosClient} from "./index";

class PeopleService{

    client = publicAxiosClient({
        baseURL: "people/",
    });

    async getPeople(page=1, name='', country=''){
        try{
            const response = await this.client.get(
                "",
                {
                    params: {page, name, country}
                }
            );
            return {...response.data, status: response.status};
        }catch(error){
            console.log("PEOPLE SERVICE :: GET PEOPLE ERROR :: ", error.message )
            return error.response;
        }
    }

    async profile(userUUID){
        try{
            const response = await this.client.get(
                `${userUUID}/`,
            );
            return {...response.data, status: response.status};
        }catch(error){
            console.log("PEOPLE SERVICE :: GET PROFILE ERROR :: ", error.message )
            return error.response;
        }
    }

    async following(userUUID, page=1){
        try{
            const response = await this.client.get(
                `following/${userUUID}/`,
                {
                    params: {page}
                }
            );
            return {...response.data, status: response.status};
        }catch(error){
            console.log("PEOPLE SERVICE :: GET FOLLOWING ERROR :: ", error.message )
            return error.response;
        }
    }

    async followers(userUUID, page=1){
        try{
            const response = await this.client.get(
                `followers/${userUUID}/`,
                {
                    params: {page}
                }
            );
            return {...response.data, status: response.status};
        }catch(error){
            console.log("PEOPLE SERVICE :: GET FOLLOWERS ERROR :: ", error.message )
            return error.response;
        }
    }

}


const peopleService = new PeopleService();
export default peopleService;
