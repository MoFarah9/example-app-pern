import { Route, Switch } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ArticlePage from './pages/ArticlePage'
import NewArticlePage from './pages/NewArticlePage'

export default function App() {
  return (
    <div className="App">
      <header>
        <div>Example Website</div>
      </header>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/article/:id">
          <ArticlePage />
        </Route>
        <Route path="/new-article">
          <NewArticlePage />
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
