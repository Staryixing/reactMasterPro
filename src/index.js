import dva from "dva";
import registerModels from "./models/index";
import "./rootFontSet";
import reportWebVitals from "./reportWebVitals";
import './index.css';

const app = dva();
// app.use({});
registerModels(app);
// app.model(require('./models'))
app.router(require("./router").default);
app.start("#root");
reportWebVitals();
