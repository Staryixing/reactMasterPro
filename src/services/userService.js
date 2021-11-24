import HttpHelp from '@/utils/Http.js'
import { BaseURL } from '@/constants/requestConstants';
class UserServer extends HttpHelp {
    fetch = ({
        params = {},
        headers = {}
    }) => {
        for(let i in params){
          if(params[i] === "" || params[i]  === undefined){
            delete params[i]
          }
        }      
        return this.get('/employee',{
            params,
            headers
        })
    }
    add = ({
        params = {},
        headers = {}
    }) => {
        return this.post('/employee',{
            params,
            headers
        })
    }
    edit = ({
        params = {},
        headers = {}
    }) => {
        return this.put('/employee',{
            params,
            headers
        })
    }
    active = ({
        params = {},
        headers = {}
    }) => {
        return this.put('/employee/active',{
            params,
            headers
        })
    }
    del = ({
        params = {},
        headers = {}
    })=> {
        return this.delete('/employee',{
            params,
            headers
        })
    }
}

export default new UserServer(BaseURL)
