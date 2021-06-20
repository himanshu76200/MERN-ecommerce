import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Header from "./components/Header";
import Footer from './components/Footer';
import ProductScreen from './screens/ProductScreen';
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen"

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Container>
        <main className="py-3">
          <Route path="/" component={HomeScreen} exact />
          <Route path="/product/:id" component={ProductScreen} />
        </main>
      </Container>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
