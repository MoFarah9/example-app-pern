import { Route, Switch } from 'react-router-dom'
import NewArticle from './pages/NewArticle'
import Home from './pages/Home'

export default function App() {
  return (
    <div className="App">
      <header>
        <div>Example Website</div>
      </header>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/new-article">
          <NewArticle />
        </Route>
        <Route>
          <main>
            <h3>Page not found</h3>
          </main>
        </Route>
      </Switch>
    </div>
  )
}
