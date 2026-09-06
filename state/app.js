import React from 'react';
import { Link, animateScroll as scroll } from 'react-scroll'; // For smooth scroll
import './App.css';

function App() {
  return (
    <div className="App">
      {/* Header Section */}
      <header className="header">
        <h1>Water Efficient Techniques and Methods for Minimizing Water Scarcity</h1>
      </header>

      {/* Banner Section */}
      <div className="banner">
        <img src="water1.jpg" alt="Water Conservation Banner" className="active" />
        <img src="water.jpg" alt="Water Conservation Banner" />
      </div>

      {/* Quotes Section */}
      <div className="quotes">
        <p>"Water is the driving force of all nature." - Leonardo da Vinci</p>
        <p>"Thousands have lived without love, not one without water." - W. H. Auden</p>
        <p>"Water is life." - Unknown</p>
      </div>

      {/* Smooth Scroll Links to Sections */}
      <div className="scroll-links">
        <Link to="content" smooth={true} duration={500} className="scroll-link">Scroll to Techniques</Link>
        <Link to="state-wise" smooth={true} duration={500} className="scroll-link">Scroll to State-wise Techniques</Link>
      </div>

      {/* Content Section */}
      <section id="content" className="content">
        <div className="map"></div>
        <div className="description">
          <h2>Efficient Water Conservation Techniques</h2>
          <p>
            Water scarcity is a growing concern globally, and India is no exception. To minimize this issue, it is essential to adopt water-efficient techniques and methods that help conserve this precious resource. Below are some of the most effective techniques:
          </p>
          <h3>6. Education and Awareness</h3>
          <p>Raising awareness about water conservation and its importance is crucial for driving change. Educational programs and campaigns can help people understand the significance of using water efficiently and the role they can play in conserving it.</p>
          <p>Implementing these techniques not only helps reduce water wastage but also ensures a sustainable future for generations to come. As individuals, communities, and governments work together, we can significantly minimize water scarcity and ensure that this vital resource is available for all.</p>
        </div>
      </section>

      {/* State-wise Techniques Section */}
      <section id="state-wise" className="state-wise">
        <h2>State-wise Techniques</h2>
        <div className="grid-container">
          <div className="card" data-state="Andhra Pradesh">
            <img src="images/andhra-pradesh.jpg" alt="Andhra Pradesh" />
            <h2>Andhra Pradesh</h2>
          </div>
          <div className="card" data-state="Tamil Nadu">
            <img src="images/tamil-nadu.jpg" alt="Tamil Nadu" />
            <h2>Tamil Nadu</h2>
          </div>
        </div>
      </section>

      {/* Background Video */}
      <video className="video-background" autoplay muted loop>
        <source src="videos/state1.mp4" type="video/mp4" />
        <source src="videos/state1.webm" type="video/webm" />
        <source src="videos/state1.ogg" type="video/ogg" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default App;
