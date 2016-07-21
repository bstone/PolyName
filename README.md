# PolyName: Convert your name into a polynomial

The repo is a fun project that creates a polynomial given the user's name. The code constructs the [https://en.wikipedia.org/wiki/Lagrange_polynomial](Lagrange Polynomial) using javascript and the following libraries:

* [https://gitgud.io/unconed/mathbox/](MathBox) 
* [https://github.com/d3/d3](D3.js)
* [https://github.com/infusion/Fraction.js](Fraction.js)
* [https://github.com/MrRio/jsPDF](jsPDF)

You can view the code in action here, [http://b-stone.github.io/PolyName/](http://b-stone.github.io/PolyName/), or you can run the code locally following the instructions below.

## Running locally

### First Clone the Repository

```
git clone https://github.com/b-stone/PolyName.git
cd PolyName
```

### Run a local server

Once you have the repo cloned you will need to run a server. If you have `npm`, you can get started by running

```
npm install
npm start
```

Once the server is started you can open up your web browser to : 

http://0.0.0.0:8080/

If you don't have `npm`, and you are on a Linux or Mac, you should be able to use python's built in webserver:

     python -m SimpleHTTPServer 3000

Once the server has started, open up your web browser to:

http://0.0.0.0:3000/

