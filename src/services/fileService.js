import { BaseURL } from '@/constants/requestConstants.js';
import HttpHelp from '@/utils/Http.js';
class FileServer extends HttpHelp{
      file = ({
        params = {},
        headers = {}
    })=> {
      return this.uploadPost('/file',{
        params,
        headers
      })
    };
}

export default new FileServer(BaseURL);
