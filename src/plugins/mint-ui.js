import Vue from 'vue'
import { Button, Cell, Header, Loadmore, Spinner, Toast, Field, InfiniteScroll } from 'mint-ui'

Vue.use(InfiniteScroll)
Vue.component(Header.name, Header)
Vue.component(Loadmore.name, Loadmore)
Vue.component(Spinner.name, Spinner)
Vue.component(Button.name, Button)
Vue.component(Cell.name, Cell)
Vue.component(Field.name, Field)

Vue.prototype.$Toast = Toast
