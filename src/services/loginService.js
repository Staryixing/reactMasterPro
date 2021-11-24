import { BaseURL } from '@/constants/requestConstants.js';
import HttpHelp from '@/utils/Http.js';
class LoginServer extends HttpHelp{
  login = ({
      params = {},
      headers = {}
  }) => {
      return this.post('/employee/login',{
          params,
          headers
      })
  }
  logout = ({
      params = {},
      headers = {}
  }) => {
      return this.post('/employee/logout',{
          params,
          headers
      })
  }

}

export default new LoginServer(BaseURL);
