import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { useUser } from "../UserContext";

const BeddingCleaningPage = () => {
  const navigate = useNavigate();
  const { addToWishlist } = useUser();
  const [quantity, setQuantity] = useState(1);
  const [selectedItem, setSelectedItem] = useState("comforter");
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const serviceDetails = {
    id: "bedding-clean",
    name: "Bedding Cleaning",
    icon: "fas fa-bed",
    price: 27.99,
    description: "Deep cleaning for all types of bedding items",
    longDescription: "Our specialized bedding cleaning service thoroughly treats comforters, quilts, bed covers, sheets, and pillows to remove allergens, dust mites, stains, and odors. We use gentle yet effective cleaning methods to ensure your bedding items are pristine, fluffy, and hygienic without damaging delicate materials.",
    features: [
      "Allergen and dust mite removal",
      "Stain and odor treatment",
      "Gentle cleaning for delicate fabrics",
      "Thorough drying process",
      "Fabric softening and fluffing"
    ],
    priceOptions: [
      { id: "comforter", name: "Comforters/Duvets", price: 27.99, unit: "per piece" },
      { id: "quilt", name: "Quilts", price: 35.99, unit: "per piece" },
      { id: "bedsheet", name: "Bed Sheets (Set)", price: 42.99, unit: "per set" },
      { id: "pillow", name: "Pillow Cleaning", price: 85, unit: "for 2 pillows" },
      { id: "mattress", name: "Mattress Cleaning", price: 149, unit: "per mattress" }
    ],
    process: [
      { name: "Inspection", description: "Thorough assessment of bedding condition and fabric type", icon: "fas fa-search" },
      { name: "Pre-treatment", description: "Targeted spot treatment for stains and odors", icon: "fas fa-vial" },
      { name: "Cleaning", description: "Deep cleaning with appropriate methods for fabric type", icon: "fas fa-soap" },
      { name: "Drying", description: "Controlled temperature drying process", icon: "fas fa-wind" }
    ],
    testimonials: [
      { name: "Manish P.", rating: 4.7, comment: "My comforter feels like new again. Worth every penny!" },
      { name: "Anjali D.", rating: 4.8, comment: "I had my child's bedding cleaned - the stains are completely gone!" }
    ],
    category: "home",
    rating: 4.7
  };
  
  const handleBookService = () => {
    try {
      navigate('/service-payment', { state: { service: { ...serviceDetails, quantity: quantity, selectedOption: selectedItem, totalPrice: calculatePrice() } } });
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
    const item = serviceDetails.priceOptions.find(option => option.id === selectedItem);
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
            <label className="form-label">Bedding Item</label>
            <select 
              className="form-select" 
              value={selectedItem}
              onChange={(e) => setSelectedItem(e.target.value)}
              style={{ borderRadius: "8px", padding: "10px" }}
            >
              {serviceDetails.priceOptions.map(option => (
                <option key={option.id} value={option.id}>{option.name} - ₹{option.price}</option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Quantity</label>
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
          <h5 className="text-muted mb-0">Total Price:</h5>
          <h4 className="mb-0" style={{ color: categoryColor, fontWeight: "700" }}>₹{calculatePrice()}</h4>
        </div>
        
        <button 
          className="btn w-100 mt-3" 
          onClick={handleBookService}
          style={{ 
            backgroundColor: categoryColor,
            color: "white",
            padding: "12px",
            borderRadius: "8px",
            fontWeight: "600",
            boxShadow: `0 4px 15px -5px ${categoryColor}88`
          }}
        >
          Book Service
        </button>
      </div>
      
      {/* Service Description */}
      <div className="px-3 mt-4 mb-4">
        <div className="p-4 rounded" style={{ backgroundColor: "#f8f9fa", borderRadius: "12px" }}>
          <h5 className="fw-bold mb-3">About This Service</h5>
          <p style={{ lineHeight: "1.8" }}>{serviceDetails.longDescription}</p>
        </div>
      </div>
      
      {/* Info Section */}
      <div className="px-3 mb-4">
        <div className="p-3 rounded" style={{ 
          backgroundColor: `${categoryColor}10`,
          border: `1px solid ${categoryColor}30`,
          borderRadius: "12px"
        }}>
          <div className="d-flex align-items-center mb-2">
            <i className="fas fa-shield-alt me-2" style={{ color: categoryColor }}></i>
            <h6 className="fw-bold mb-0">Health Benefits</h6>
          </div>
          <p className="mb-0">Regular bedding cleaning can reduce allergens by up to 90% and help prevent respiratory issues. We recommend cleaning your bedding items every 3-6 months for optimal hygiene.</p>
        </div>
      </div>
      
      {/* Service Features */}
      <div className="px-3 mb-4">
        <div className="p-4 rounded" style={{ backgroundColor: "#f8f9fa", borderRadius: "12px" }}>
          <h5 className="fw-bold mb-3">Service Features</h5>
          <div className="row g-2">
            {serviceDetails.features.map((feature, index) => (
              <div key={index} className="col-12">
                <div className="d-flex align-items-center p-2">
                  <div className="me-3" style={{ 
                    width: "36px", 
                    height: "36px", 
                    borderRadius: "50%", 
                    backgroundColor: `${categoryColor}20`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: categoryColor
                  }}>
                    <i className="fas fa-check"></i>
                  </div>
                  <div>{feature}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Service Process */}
      <div className="px-3 mb-4">
        <div className="p-4 rounded" style={{ backgroundColor: "#f8f9fa", borderRadius: "12px" }}>
          <h5 className="fw-bold mb-3">Our Process</h5>
          <div className="row g-3">
            {serviceDetails.process.map((step, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <div className="text-center p-3" style={{ 
                  backgroundColor: "white", 
                  borderRadius: "12px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                }}>
                  <div className="mb-2 mx-auto" style={{ 
                    width: "50px", 
                    height: "50px", 
                    borderRadius: "50%", 
                    backgroundColor: `${categoryColor}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.2rem",
                    color: categoryColor
                  }}>
                    <i className={step.icon}></i>
                  </div>
                  <h6 className="fw-bold">{step.name}</h6>
                  <p className="small text-muted mb-0">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Testimonials */}
      <div className="px-3 mt-4">
        <div className="p-4 rounded shadow-sm" style={{ backgroundColor: "white", borderRadius: "12px" }}>
          <h5 className="fw-bold mb-3">Customer Testimonials</h5>
          <div className="row g-3">
            {serviceDetails.testimonials.map((testimonial, index) => (
              <div key={index} className="col-md-6">
                <div className="p-3" style={{ 
                  backgroundColor: `${categoryColor}08`,
                  borderRadius: "10px",
                  border: `1px solid ${categoryColor}20`
                }}>
                  <div className="d-flex align-items-center mb-2">
                    <div style={{ 
                      width: "40px",
                      height: "40px",
                      backgroundColor: `${categoryColor}20`,
                      color: categoryColor,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold"
                    }}>
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="ms-2">
                      <p className="mb-0 fw-bold">{testimonial.name}</p>
                      <div>
                        <span style={{ color: "#FFD700" }}>★</span> {testimonial.rating}
                      </div>
                    </div>
                  </div>
                  <p className="mb-0">{testimonial.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Book Now Button */}
      <div className="px-3 mt-4 mb-5">
        <button 
          className="btn btn-lg w-100 py-3" 
          style={{ 
            background: `linear-gradient(135deg, ${categoryColor} 0%, ${categoryColor}DD 100%)`,
            color: "white",
            fontWeight: "600",
            borderRadius: "10px",
            boxShadow: `0 8px 15px ${categoryColor}80`,
            textTransform: "uppercase",
            letterSpacing: "1px"
          }}
          onClick={handleBookService}
        >
          <i className="fas fa-shopping-cart me-2"></i> Book Now • ₹{calculatePrice()}
        </button>
        <div className="text-center mt-3">
          <p className="text-muted mb-0"><small>Free pickup and delivery for orders above ₹499</small></p>
        </div>
      </div>
    </div>
  );
};

export default BeddingCleaningPage; 