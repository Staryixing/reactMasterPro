import globalmodel from './global';
import TypeModal from './status';
import SocketModal from './socketData';
export default function registerModels(app){
  app.model(globalmodel);
  app.model(TypeModal);
  app.model(SocketModal);
}
