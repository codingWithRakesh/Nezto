import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { useUser } from "../UserContext";

const HomeCleaningPage = () => {
  const navigate = useNavigate();
  const { addToWishlist } = useUser();
  const [quantity, setQuantity] = useState(1);
  const [cleaningType, setCleaningType] = useState("basic-cleaning");
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const serviceDetails = {
    id: "home-cleaning",
    name: "Home Cleaning",
    icon: "fas fa-broom",
    price: 399,
    description: "Professional home cleaning services",
    longDescription: "Our comprehensive home cleaning service provides thorough cleaning for your entire home or selected areas. Our trained professionals use eco-friendly products and follow systematic cleaning protocols to ensure your home is spotless, hygienic, and fresh. We adapt our cleaning approach based on your specific requirements and home layout.",
    features: [
      "Eco-friendly cleaning products",
      "Trained and background-verified staff",
      "Deep cleaning of all surfaces",
      "Kitchen and bathroom sanitization",
      "Floor to ceiling dust removal",
      "Customizable cleaning checklist"
    ],
    priceOptions: [
      { id: "basic-cleaning", name: "Basic Cleaning (1BHK)", price: 399, unit: "per session" },
      { id: "standard-cleaning", name: "Standard Cleaning (2BHK)", price: 599, unit: "per session" },
      { id: "deep-cleaning", name: "Deep Cleaning (1BHK)", price: 999, unit: "per session" },
      { id: "premium-cleaning", name: "Premium Cleaning (2BHK)", price: 1499, unit: "per session" },
      { id: "move-in-out", name: "Move In/Out Cleaning", price: 1999, unit: "per session" }
    ],
    process: [
      { name: "Assessment", description: "Initial evaluation of your home and specific cleaning requirements", icon: "fas fa-clipboard-list" },
      { name: "Preparation", description: "Setting up equipment and eco-friendly cleaning solutions", icon: "fas fa-spray-can" },
      { name: "Systematic Cleaning", description: "Methodical cleaning from top to bottom following checklist", icon: "fas fa-broom" },
      { name: "Deep Sanitization", description: "Special attention to high-touch surfaces and germ-prone areas", icon: "fas fa-hand-sparkles" },
      { name: "Final Inspection", description: "Quality check to ensure all areas have been properly cleaned", icon: "fas fa-clipboard-check" }
    ],
    testimonials: [
      { name: "Rahul M.", rating: 4.8, comment: "The team was very professional and thorough. My apartment looks spotless!" },
      { name: "Priya K.", rating: 4.7, comment: "I've tried several cleaning services and this is by far the best. Great attention to detail." }
    ],
    category: "home",
    rating: 4.8
  };
  
  const handleBookService = () => {
    try {
      navigate('/service-payment', { state: { service: { ...serviceDetails, quantity: quantity, selectedOption: cleaningType, totalPrice: calculatePrice() } } });
    } catch (err) {
      console.error("Navigation error:", err);
      alert("Could not navigate to payment page. Please try again.");
    }
  };
  
  const handleWishlist = (e) => {
    e.stopPropagation();
    try {
      // Add to wishlist logic
      const itemToAdd = {
        id: serviceDetails.id,
        name: serviceDetails.name,
        price: calculatePrice(),
        quantity: quantity,
        icon: serviceDetails.icon,
        description: serviceDetails.description
      };
      
      addToWishlist?.(itemToAdd);
      setIsWishlisted(true);
      setTimeout(() => setIsWishlisted(false), 2000);
    } catch (err) {
      console.error("Wishlist error:", err);
    }
  };
  
  const handleBack = () => {
    navigate('/services');
  };

  const calculatePrice = () => {
    const item = serviceDetails.priceOptions.find(option => option.id === cleaningType);
    return item ? item.price * quantity : 0;
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };
  
  // Get category color for styling
  const getCategoryColor = () => {
    const categories = {
      "daily": "#FF9800",
      "premium": "#8E44AD",
      "home": "#4CAF50",
      "quick": "#F44336",
      "default": "#40BFC1"
    };
    return categories[serviceDetails.category] || categories.default;
  };

  const categoryColor = getCategoryColor();

  return (
    <div className="container-fluid p-0 pb-5" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      {/* Header with back button */}
      <div className="d-flex align-items-center justify-content-between px-3 py-3" style={{ 
        background: `linear-gradient(135deg, ${categoryColor} 0%, ${categoryColor}DD 100%)`,
        color: "white",
        position: "sticky",
        top: 0,
        zIndex: 100
      }}>
        <div className="d-flex align-items-center">
          <button 
            className="btn" 
            onClick={handleBack}
            style={{ 
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              color: "white",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(5px)"
            }}
          >
            <i className="fas fa-arrow-left" style={{ fontSize: "0.9rem" }}></i>
          </button>
          <h5 className="mb-0 ms-2" style={{ fontSize: "1.3rem", fontWeight: "600" }}>{serviceDetails.name}</h5>
        </div>
        <button 
          onClick={handleWishlist}
          style={{ 
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            color: isWishlisted ? "#FF5A5F" : "white",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(5px)"
          }}
        >
          <i className={isWishlisted ? "fas fa-heart" : "far fa-heart"} style={{ fontSize: "1rem" }}></i>
        </button>
      </div>
      
      {/* Service Banner */}
      <div className="text-center p-4 position-relative" style={{ 
        background: `linear-gradient(135deg, ${categoryColor} 0%, ${categoryColor}DD 100%)`,
        color: "white",
        borderRadius: "0 0 30px 30px",
        boxShadow: `0 8px 20px -10px ${categoryColor}88`
      }}>
        <div className="position-relative mb-4">
          <div style={{ 
            fontSize: "2.5rem",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            width: "90px",
            height: "90px",
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
            border: "2px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0 10px 20px -8px rgba(0, 0, 0, 0.2)"
          }}>
            <i className={serviceDetails.icon}></i>
          </div>
          <div className="position-absolute" style={{
            right: "calc(50% - 70px)",
            bottom: "-5px",
            backgroundColor: "rgba(255, 255, 255, 0.25)",
            color: "white",
            padding: "5px 15px",
            borderRadius: "20px",
            fontSize: "0.9rem",
            fontWeight: "500",
            backdropFilter: "blur(5px)"
          }}>
            {serviceDetails.rating} Rating
          </div>
        </div>
        <h1 className="fw-bold mb-3" style={{ 
          fontSize: "2rem", 
          textShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"
        }}>{serviceDetails.name}</h1>
        <p className="mb-3 mx-auto" style={{ maxWidth: "600px", fontSize: "1rem" }}>{serviceDetails.description}</p>
        <div style={{ 
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          display: "inline-block",
          padding: "8px 20px",
          borderRadius: "30px",
          fontSize: "1.2rem",
          fontWeight: "bold",
          backdropFilter: "blur(5px)"
        }}>
          Starting from ₹{serviceDetails.price}
        </div>
      </div>
      
      {/* Quick Booking Calculator */}
      <div className="mx-3 p-4 rounded shadow-sm" style={{ 
        backgroundColor: "white", 
        marginTop: "-25px", 
        borderRadius: "12px",
        border: "1px solid #eaeaea",
        position: "relative",
        zIndex: 10
      }}>
        <h5 className="fw-bold mb-3">Quick Price Calculator</h5>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Cleaning Type</label>
            <select 
              className="form-select" 
              value={cleaningType}
              onChange={(e) => setCleaningType(e.target.value)}
              style={{ borderRadius: "8px", padding: "10px" }}
            >
              {serviceDetails.priceOptions.map(option => (
                <option key={option.id} value={option.id}>{option.name} - ₹{option.price}</option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Sessions</label>
            <div className="input-group">
              <button 
                className="btn" 
                type="button" 
                onClick={decrementQuantity}
                style={{ backgroundColor: `${categoryColor}15`, borderColor: "#e0e0e0" }}
              >-</button>
              <input 
                type="number" 
                className="form-control text-center" 
                value={quantity} 
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                style={{ borderLeft: "none", borderRight: "none" }}
              />
              <button 
                className="btn" 
                type="button" 
                onClick={incrementQuantity}
                style={{ backgroundColor: `${categoryColor}15`, borderColor: "#e0e0e0" }}
              >+</button>
            </div>
          </div>
        </div>
        
        <hr className="my-3" />
        
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5 className="mb-0">Estimated Price</h5>
            <p className="text-muted mb-0"><small>Final price may vary based on home condition and size</small></p>
          </div>
          <div>
            <h3 className="mb-0 fw-bold" style={{ color: categoryColor }}>₹{calculatePrice()}</h3>
          </div>
        </div>
      </div>
      
      {/* Service Description */}
      <div className="px-3 mt-4 mb-4">
        <div className="p-4 rounded" style={{ backgroundColor: "white", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
          <h5 className="fw-bold mb-3">About This Service</h5>
          <p style={{ lineHeight: "1.8" }}>{serviceDetails.longDescription}</p>
        </div>
      </div>
      
      {/* Service Process */}
      <div className="px-3 mb-4">
        <h5 className="fw-bold mb-4">Our Cleaning Process</h5>
        <div className="row g-3">
          {serviceDetails.process.map((step, index) => (
            <div key={index} className="col-md-4 mb-3">
              <div className="p-3 h-100 d-flex flex-column align-items-center text-center" style={{ 
                backgroundColor: "white", 
                borderRadius: "12px",
                boxShadow: "0 3px 10px rgba(0, 0, 0, 0.05)",
                border: "1px solid #eaeaea"
              }}>
                <div className="mb-3 rounded-circle d-flex align-items-center justify-content-center" style={{ 
                  width: "60px", 
                  height: "60px", 
                  backgroundColor: `${categoryColor}15`,
                  color: categoryColor
                }}>
                  <i className={step.icon} style={{ fontSize: "1.5rem" }}></i>
                </div>
                <h6 className="fw-bold">{step.name}</h6>
                <p className="text-muted small mb-0">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Service Features */}
      <div className="px-3 mb-5">
        <h5 className="fw-bold mb-3">What's Included</h5>
        <div className="row g-3">
          {serviceDetails.features.map((feature, index) => (
            <div key={index} className="col-md-6">
              <div className="d-flex align-items-center p-3" style={{ 
                backgroundColor: "white", 
                borderRadius: "10px",
                boxShadow: "0 3px 10px rgba(0, 0, 0, 0.05)",
                height: "100%",
                border: "1px solid #eaeaea"
              }}>
                <div className="me-3 rounded-circle d-flex align-items-center justify-content-center" style={{ 
                  minWidth: "40px", 
                  height: "40px", 
                  backgroundColor: `${categoryColor}15`,
                  color: categoryColor
                }}>
                  <i className="fas fa-check"></i>
                </div>
                <span>{feature}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Price List */}
      <div className="px-3 mb-5">
        <div className="p-4 rounded shadow-sm" style={{ backgroundColor: "white", borderRadius: "12px" }}>
          <h5 className="fw-bold mb-4">Detailed Price List</h5>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead style={{ backgroundColor: "#f8f9fa" }}>
                <tr>
                  <th style={{ fontWeight: "600" }}>Service</th>
                  <th style={{ fontWeight: "600" }}>Price (₹)</th>
                  <th style={{ fontWeight: "600" }}>Unit</th>
                </tr>
              </thead>
              <tbody>
                {serviceDetails.priceOptions.map((option, index) => (
                  <tr key={index}>
                    <td>{option.name}</td>
                    <td className="fw-bold" style={{ color: categoryColor }}>₹{option.price}</td>
                    <td>{option.unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="alert alert-info mt-3 mb-0" role="alert" style={{ borderRadius: "8px" }}>
            <div className="d-flex">
              <div className="me-3">
                <i className="fas fa-info-circle fs-4"></i>
              </div>
              <div>
                <p className="mb-0">Prices may vary based on actual home size, condition, and special requirements. Additional charges may apply for heavily soiled areas or special cleaning requests.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Customer Testimonials */}
      <div className="px-3 mb-5">
        <h5 className="fw-bold mb-3">Customer Reviews</h5>
        <div className="row g-3">
          {serviceDetails.testimonials.map((testimonial, index) => (
            <div key={index} className="col-md-6">
              <div className="p-3 h-100" style={{ 
                backgroundColor: "white", 
                borderRadius: "12px",
                boxShadow: "0 3px 10px rgba(0, 0, 0, 0.05)",
                border: "1px solid #eaeaea"
              }}>
                <div className="d-flex mb-2 align-items-center">
                  <div style={{ 
                    backgroundColor: `${categoryColor}20`,
                    color: categoryColor,
                    padding: "3px 8px",
                    borderRadius: "6px",
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                    display: "inline-block"
                  }}>
                    {testimonial.rating}
                  </div>
                </div>
                <p className="mb-2" style={{ fontSize: "0.95rem" }}>"{testimonial.comment}"</p>
                <p className="mb-0 text-end" style={{ fontSize: "0.85rem", fontWeight: "600" }}>- {testimonial.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Floating Book Button */}
      <div style={{ 
        position: "fixed", 
        bottom: "16px", 
        left: "16px", 
        right: "16px", 
        zIndex: 100 
      }}>
        <button 
          className="btn w-100 py-3" 
          style={{ 
            backgroundColor: categoryColor, 
            color: "white",
            fontWeight: "600",
            borderRadius: "10px",
            boxShadow: `0 8px 15px ${categoryColor}80`,
            textTransform: "uppercase",
            letterSpacing: "1px",
            border: "none"
          }}
          onClick={handleBookService}
        >
          <i className="fas fa-shopping-cart me-2"></i> Book Now • ₹{calculatePrice()}
        </button>
        <div className="text-center mt-2">
          <p className="text-muted mb-0 small">100% satisfaction guarantee</p>
        </div>
      </div>
    </div>
  );
};

export default HomeCleaningPage; 