import React, { useState } from "react";
import "../Pages/Styles/HomeContent.css";
import { MdKeyboardArrowDown } from "react-icons/md";
import Footer from "../Pages/Footer/Footer";
function HomeContent() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const [selectedButton, setSelectedButton] = useState("New Developments");
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };
  return (
    <div className="HomeContent">
      <div className="HomeContent-first-image">
        <div className="HomeContent-first-image-text">
          <p className="HomeContent-first-image-text-first">
            The <span> Solution</span> to Finding Your Dream Home is{" "}
            <span> Here</span>
          </p>
          <p className="HomeContent-first-image-text-second">
            We help you find your dream home
          </p>
        </div>
        <div className="HomeContent-first-image-Box">
          <div className="HomeContent-first-image-Box-content">
            <div className="HomeContent-first-image-Box-content-first">
              <div className="first-dropdown-effect" onClick={toggleDropdown}>
                <div className="first-dropdown-effect-drop">
                  <div>property type</div>
                  <MdKeyboardArrowDown />
                </div>
                <div className="drop">Small House</div>
              </div>
              <div className="first-dropdown-effect" onClick={toggleDropdown}>
                <div className="first-dropdown-effect-drop">
                  <div>Location</div>
                  <MdKeyboardArrowDown />
                </div>
                <div className="drop">Los Angles</div>
              </div>
              <div className="first-dropdown-effect" onClick={toggleDropdown}>
                <div className="first-dropdown-effect-drop">
                  <div>Price Range</div>
                  <MdKeyboardArrowDown />
                </div>
                <div className="drop">$50k - $100k</div>
              </div>
              <div className="first-dropdown-effect" onClick={toggleDropdown}>
                <div className="first-dropdown-effect" onClick={toggleDropdown}>
                  <div className="first-dropdown-effect-drop">
                    <div>Property</div>
                    <MdKeyboardArrowDown />
                  </div>
                  <p className="drop">{selectedOption || "Select option"}</p>
                  {isOpen && (
                    <div className="dropdown-menu">
                      <p onClick={() => handleOptionClick("Small House")}>
                        Small House
                      </p>
                      <p onClick={() => handleOptionClick("Large House")}>
                        Large House
                      </p>
                      <p onClick={() => handleOptionClick("Apartment")}>
                        Apartment
                      </p>
                      <p onClick={() => handleOptionClick("Condo")}>Condo</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div>
              <button>Login</button>
            </div>
          </div>
        </div>
        <div className="mask-group">
          <img src="https://i.ibb.co/prrbxbT/Mask-group.png" alt="" />
        </div>
      </div>
      <div className="HomeContent-second-content">
        <div className="HomeContent-second-content-title">
          <div>Most Views</div>
          <div>
            We offer a wide selection of the newest properties ready for you to
            explore
          </div>
        </div>
        <div className="HomeContent-second-content-button">
          <div
            className={selectedButton === "New Developments" ? "active" : ""}
            onClick={() => handleButtonClick("New Developments")}
          >
            New Developments
          </div>
          <div
            className={selectedButton === "Used Properties" ? "active" : ""}
            onClick={() => handleButtonClick("Used Properties")}
          >
            Used Properties
          </div>
          <div
            className={selectedButton === "Rentals" ? "active" : ""}
            onClick={() => handleButtonClick("Rentals")}
          >
            Rentals
          </div>
          <div
            className={selectedButton === "All Properties" ? "active" : ""}
            onClick={() => handleButtonClick("All Properties")}
          >
            All Properties
          </div>
        </div>
        <div className="HomeContent-second-content-property-view">
          <div className="property-view-data">
            <img src="https://i.ibb.co/K9gN0qn/image-5.png" alt="" />
            <div className="title">Minimalist House</div>
            <div className="discription">
              <div>Description of the</div>
              <div>house you are offering</div>
            </div>
            <div className="price-button">
              <div>$100.000</div>
              <button>View More</button>
            </div>
            <div className="property-view-last-section">
              <div className="last-section-data">
                <img
                  src="https://res-console.cloudinary.com/dg5gwixf1/thumbnails/v1/image/upload/v1731170000/VW5pb25fMl92am90anc=/drilldown"
                  alt=""
                />
                <div>5 Bedroom</div>
              </div>
              <div className="last-section-data">
                <img
                  src="https://res-console.cloudinary.com/dg5gwixf1/thumbnails/v1/image/upload/v1731170000/VW5pb25fcm1oemRv/drilldown"
                  alt=""
                />
                <div>3 Bathrooms</div>
              </div>
              <div className="last-section-data">
                <img
                  src="https://res-console.cloudinary.com/dg5gwixf1/thumbnails/v1/image/upload/v1731170000/VW5pb25fMV9wb3JjcDc=/drilldown"
                  alt=""
                />
                <div>72 m2</div>
              </div>
            </div>
          </div>
          <div className="property-view-data">
            <img src="https://i.ibb.co/K9gN0qn/image-5.png" alt="" />
            <div className="title">Modern House</div>
            <div className="discription">
              <div>Description of the</div>
              <div>house you are offering</div>
            </div>
            <div className="price-button">
              <div>$100.000</div>
              <button>View More</button>
            </div>
            <div className="property-view-last-section">
              <div className="last-section-data">
                <img
                  src="https://res-console.cloudinary.com/dg5gwixf1/thumbnails/v1/image/upload/v1731170000/VW5pb25fMl92am90anc=/drilldown"
                  alt=""
                />
                <div>5 Bedroom</div>
              </div>
              <div className="last-section-data">
                <img
                  src="https://res-console.cloudinary.com/dg5gwixf1/thumbnails/v1/image/upload/v1731170000/VW5pb25fcm1oemRv/drilldown"
                  alt=""
                />
                <div>3 Bathrooms</div>
              </div>
              <div className="last-section-data">
                <img
                  src="https://res-console.cloudinary.com/dg5gwixf1/thumbnails/v1/image/upload/v1731170000/VW5pb25fMV9wb3JjcDc=/drilldown"
                  alt=""
                />
                <div>72 m2</div>
              </div>
            </div>
          </div>
          <div className="property-view-data">
            <img src="https://i.ibb.co/K9gN0qn/image-5.png" alt="" />
            <div className="title">Industrial House</div>
            <div className="discription">
              <div>Description of the</div>
              <div>house you are offering</div>
            </div>
            <div className="price-button">
              <div>$100.000</div>
              <button>View More</button>
            </div>
            <div className="property-view-last-section">
              <div className="last-section-data">
                <img
                  src="https://res-console.cloudinary.com/dg5gwixf1/thumbnails/v1/image/upload/v1731170000/VW5pb25fMl92am90anc=/drilldown"
                  alt=""
                />
                <div>5 Bedroom</div>
              </div>
              <div className="last-section-data">
                <img
                  src="https://res-console.cloudinary.com/dg5gwixf1/thumbnails/v1/image/upload/v1731170000/VW5pb25fcm1oemRv/drilldown"
                  alt=""
                />
                <div>3 Bathrooms</div>
              </div>
              <div className="last-section-data">
                <img
                  src="https://res-console.cloudinary.com/dg5gwixf1/thumbnails/v1/image/upload/v1731170000/VW5pb25fMV9wb3JjcDc=/drilldown"
                  alt=""
                />
                <div>72 m2</div>
              </div>
            </div>
          </div>
          <div className="property-view-data">
            <img src="https://i.ibb.co/K9gN0qn/image-5.png" alt="" />
            <div className="title">Minimalist House</div>
            <div className="discription">
              <div>Description of the</div>
              <div>house you are offering</div>
            </div>
            <div className="price-button">
              <div>$100.000</div>
              <button>View More</button>
            </div>
            <div className="property-view-last-section">
              <div className="last-section-data">
                <img
                  src="https://res-console.cloudinary.com/dg5gwixf1/thumbnails/v1/image/upload/v1731170000/VW5pb25fMl92am90anc=/drilldown"
                  alt=""
                />
                <div>5 Bedroom</div>
              </div>
              <div className="last-section-data">
                <img
                  src="https://res-console.cloudinary.com/dg5gwixf1/thumbnails/v1/image/upload/v1731170000/VW5pb25fcm1oemRv/drilldown"
                  alt=""
                />
                <div>3 Bathrooms</div>
              </div>
              <div className="last-section-data">
                <img
                  src="https://res-console.cloudinary.com/dg5gwixf1/thumbnails/v1/image/upload/v1731170000/VW5pb25fMV9wb3JjcDc=/drilldown"
                  alt=""
                />
                <div>72 m2</div>
              </div>
            </div>
          </div>
          <div className="property-view-data">
            <img src="https://i.ibb.co/K9gN0qn/image-5.png" alt="" />
            <div className="title">Modern House</div>
            <div className="discription">
              <div>Description of the</div>
              <div>house you are offering</div>
            </div>
            <div className="price-button">
              <div>$100.000</div>
              <button>View More</button>
            </div>
            <div className="property-view-last-section">
              <div className="last-section-data">
                <img
                  src="https://res-console.cloudinary.com/dg5gwixf1/thumbnails/v1/image/upload/v1731170000/VW5pb25fMl92am90anc=/drilldown"
                  alt=""
                />
                <div>5 Bedroom</div>
              </div>
              <div className="last-section-data">
                <img
                  src="https://res-console.cloudinary.com/dg5gwixf1/thumbnails/v1/image/upload/v1731170000/VW5pb25fcm1oemRv/drilldown"
                  alt=""
                />
                <div>3 Bathrooms</div>
              </div>
              <div className="last-section-data">
                <img
                  src="https://res-console.cloudinary.com/dg5gwixf1/thumbnails/v1/image/upload/v1731170000/VW5pb25fMV9wb3JjcDc=/drilldown"
                  alt=""
                />
                <div>72 m2</div>
              </div>
            </div>
          </div>
          <div className="property-view-data">
            <img src="https://i.ibb.co/K9gN0qn/image-5.png" alt="" />
            <div className="title">Industrial House</div>
            <div className="discription">
              <div>Description of the</div>
              <div>house you are offering</div>
            </div>
            <div className="price-button">
              <div>$100.000</div>
              <button>View More</button>
            </div>
            <div className="property-view-last-section">
              <div className="last-section-data">
                <img
                  src="https://res-console.cloudinary.com/dg5gwixf1/thumbnails/v1/image/upload/v1731170000/VW5pb25fMl92am90anc=/drilldown"
                  alt=""
                />
                <div>5 Bedroom</div>
              </div>
              <div className="last-section-data">
                <img
                  src="https://res-console.cloudinary.com/dg5gwixf1/thumbnails/v1/image/upload/v1731170000/VW5pb25fcm1oemRv/drilldown"
                  alt=""
                />
                <div>3 Bathrooms</div>
              </div>
              <div className="last-section-data">
                <img
                  src="https://res-console.cloudinary.com/dg5gwixf1/thumbnails/v1/image/upload/v1731170000/VW5pb25fMV9wb3JjcDc=/drilldown"
                  alt=""
                />
                <div>72 m2</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="HomeContent-update">
        <div className="HomeContent-update-title">
          <div>Lastest Updates</div>
          <button>View All</button>
        </div>
        <div className="HomeContent-update-data">
          <div>
            <img src="https://i.ibb.co/sPwFDgd/image-9.png" alt="" />
            <div className="update-data-pic-tite">
              ARB to sign agreement for village
            </div>
            <div className="update-data-dis">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor
            </div>
            <button className="update-button">Read More</button>
          </div>
          <div>
            <img src="https://i.ibb.co/sPwFDgd/image-9.png" alt="" />
            <div className="update-data-pic-tite">
              New Project Launching in June
            </div>
            <div className="update-data-dis">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor
            </div>
            <button className="update-button">Read More</button>
          </div>
          <div>
            <img src="https://i.ibb.co/sPwFDgd/image-9.png" alt="" />
            <div className="update-data-pic-tite">
              ARB to sign agreement for City
            </div>
            <div className="update-data-dis">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor
            </div>
            <button className="update-button">Read More</button>
          </div>
        </div>
      </div>
      <div className="HomeContent-view">
        <div className="HomeContent-view-title">
          <div className="HomeContent-view-title-first">
            Complete Solution to Your Property Needs
          </div>
          <div className="HomeContent-view-title-Second">
            <div>
              You can explore a wide selection of high-quality properties to
              suit your lifestyle and budget. Let us help you find your dream
              home!
            </div>
            <button>More Portofolio</button>
          </div>
        </div>
        <div className="HomeContent-Gallery">
          <div className="main-image">
            <img src="https://i.ibb.co/DGSYdMZ/image-1-1.png" alt="Main" />
          </div>
          <div className="gallery-thumbs">
            <img src="https://i.ibb.co/jrpDP3J/image-2.png" alt="Thumbnail 1" />
            <img src="https://i.ibb.co/jrpDP3J/image-2.png" alt="Thumbnail 2" />
          </div>
        </div>
      </div>
      <div className="HomeContent-Choose-us">
        <div className="title">Why Choose Us</div>
        <div className="HomeContent-Choose-us-content">
          <div className="HomeContent-Choose-us-content-data">
            <img src="https://i.ibb.co/jrpDP3J/image-2.png" alt="" />
            <div className="title">Trusted Experience</div>
            <div>
              We have years of experience in the property industry and have
              helped thousands of clients find their dream home
            </div>
          </div>
          <div className="HomeContent-Choose-us-content-data">
            <img src="https://i.ibb.co/jrpDP3J/image-2.png" alt="" />
            <div className="title">Best Quality</div>
            <div>
              Every property in our portfolio goes through rigorous selection to
              ensure quality and customer satisfaction
            </div>
          </div>
          <div className="HomeContent-Choose-us-content-data">
            <img src="https://i.ibb.co/jrpDP3J/image-2.png" alt="" />
            <div className="title">Personal Service</div>
            <div className="discription">
              Our team is ready to provide personal service and support you from
              start to finish of the process of buying or renting a property
            </div>
          </div>
        </div>
      </div>
      <div className="HomeContent-About-us">
        <div className="title">What They Say About Us</div>
        <div className="HomeContent-About-us-data">
          <div className="HomeContent-About-us-data-mange">
            <div className="Blank"></div>
            <div className="Name">Olivia Wilson</div>
            <div className="discription">
              I am very satisfied with Havenova service. They helped me find my
              dream home in no time
            </div>
            <div className="Stars">
              <img src="https://i.ibb.co/7K3sg3m/Star-3.png" alt="" />
              <img src="https://i.ibb.co/7K3sg3m/Star-3.png" alt="" />
              <img src="https://i.ibb.co/7K3sg3m/Star-3.png" alt="" />
              <img src="https://i.ibb.co/7K3sg3m/Star-3.png" alt="" />
              <img src="https://i.ibb.co/7K3sg3m/Star-3.png" alt="" />
            </div>
          </div>
          <div className="HomeContent-About-us-data-mange">
            <div className="Blank"></div>
            <div className="Name">Olivia Wilson</div>
            <div className="discription">
              Thank you to the Havenova team for helping me find profitable
              property investments
            </div>
            <div className="Stars">
              <img src="https://i.ibb.co/7K3sg3m/Star-3.png" alt="" />
              <img src="https://i.ibb.co/7K3sg3m/Star-3.png" alt="" />
              <img src="https://i.ibb.co/7K3sg3m/Star-3.png" alt="" />
              <img src="https://i.ibb.co/7K3sg3m/Star-3.png" alt="" />
              <img src="https://i.ibb.co/7K3sg3m/Star-3.png" alt="" />
            </div>
          </div>
          <div className="HomeContent-About-us-data-mange">
            <div className="Blank"></div>
            <div className="Name">Olivia Wilson</div>
            <div className="discription">
              Strategic location, complete facilities, rental always sells.
              Profitable investment, comfortable lifestyle
            </div>
            <div className="Stars">
              <img src="https://i.ibb.co/7K3sg3m/Star-3.png" alt="" />
              <img src="https://i.ibb.co/7K3sg3m/Star-3.png" alt="" />
              <img src="https://i.ibb.co/7K3sg3m/Star-3.png" alt="" />
              <img src="https://i.ibb.co/7K3sg3m/Star-3.png" alt="" />
              <img src="https://i.ibb.co/7K3sg3m/Star-3.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="HomeContent-Dreams">
        <div>Your dream home is in front of your eyes</div>
      </div>
      <div className="HomeContent-Contect">
        <div>Contact Us Now</div>
        <div>
          Don't hesitate to contact our team for more information or to set up
          an appointment. We are ready to help you find your dream home
        </div>
        <button>Call Us</button>
      </div>
      <Footer />
    </div>
  );
}

export default HomeContent;
