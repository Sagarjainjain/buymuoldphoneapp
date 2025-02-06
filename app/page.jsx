"use client";
import "./homepage.css";
import logo from ".././assets/images/logo.png";
import phoneimage1 from ".././assets/images/image1.jpg";
import phoneimage2 from ".././assets/images/image2.jpg";
import phoneimage3 from ".././assets/images/image3.jpg";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import React, { useState } from "react";
import Videopreview from "@/components/videopreview/videopreview";
import CountdownTimer from "@/components/countdown/countdown";

const Home = () => {
  const [videoPreview, setVideoPreview] = useState(false);
  const [isloading, setisloading] = useState(false);
  const [isemailsame, setisemailsame] = useState("");
  const [isbid, setisbid] = useState("");
  const [ismobilenumber, setismobilenumber] = useState("");
  const [isemail, setisemail] = useState("");

  const [bidform, setbidform] = useState({
    email: "",
    number: "",
    bid: 3000,
  });
  const data = {
    title: "Samsung Galaxy M31",
    price: 3000,
    condition: "Good",
  };
  // const handlesubmit = async (e) => {
  //   e.preventDefault(); // Uncomment this to prevent the form from refreshing

  //   try {
  //     const response = await fetch(`/api/bids/search?email=${isemail}`);
  //     const data = await response.json();

  //     if (response.status === 200 && data.message === "not found") {
  //       // setisemailsame(false); // Email does not exist, proceed
  //       setisemailsame("Bid has Been Placed With this Email");
  //     } else {
  //       // setisemailsame(true); // Email already exists
  //       setisemailsame("Email not found, you can proceed!");
  //     }
  //   } catch (error) {
  //     console.error("Error checking email:", error);
  //     alert("Something went wrong. Please try again.");
  //   }
  // };
  const handlesubmit = async (e) => {
    e.preventDefault(); // Prevents page reload on form submission

    setisloading(true);

    if (!isemail.trim()) {
      setisemailsame("Please enter an email.");
      setisloading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://buymyoldphoneadmin.vercel.app/api/bids/search?email=${encodeURIComponent(
          isemail
        )}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Server error, please try again.");
      }

      if (data.message === "Not found") {
        // Format the date
        const now = new Date();
        const day = String(now.getDate()).padStart(2, "0");
        const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-based
        const year = now.getFullYear();
        const biddate = `${day}/${month}/${year}`;

        // Validate bidform data
        if (!isemail || !bidform?.number || !bidform?.bid) {
          setisemailsame("Please fill in all fields.");
          setisloading(false);
          return;
        }

        // Check if bid is less than 3000
        if (bidform.bid < 3000) {
          setisbid("Bid must be greater than 3000");
          setisloading(false);
          return; // Exit function if bid is too low
        }
        if(ismobilenumber < 10) {
          setismobilenumber("Invalid Mobile number")
          setisloading(false)
          return
        }

        // Submit new bid
        const postResponse = await fetch(
          "https://buymyoldphoneadmin.vercel.app/api/bids/new",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              useremail: isemail,
              usernumber: bidform.number,
              userbid: bidform.bid,
              biddate: biddate,
            }),
          }
        );

        if (postResponse.ok) {
          window.location.reload();
          setisloading(false);
        } else {
          const postData = await postResponse.json();
          alert(`Error: ${postData.message || "Failed to place bid."}`);
          setisloading(false);
        }
      } else {
        setisemailsame("A bid has already been placed with this email.");
        setisloading(false);
      }
    } catch (error) {
      console.error("Error checking email:", error);
      setisemailsame("Something went wrong. Please try again.");
      setisloading(false);
    }
  };


  const handleClick = async () => {
    setVideoPreview(true);
    // const now = new Date();
    // const day = String(now.getDate()).padStart(2, "0");
    // const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    // const year = now.getFullYear();
    // const hours = String(now.getHours()).padStart(2, "0");
    // const minutes = String(now.getMinutes()).padStart(2, "0");

    // const data = `${day}/${month}/${year}-${hours}/${minutes}`;

    // try {
    //   const response = await fetch(
    //     "https://buymyoldphoneadmin.vercel.app/api/click/679870fc6fce610925e9e64f",
    //     {
    //       method: "PATCH",
    //       headers: {
    //         "Content-Type": "application/json; charset=utf-8",
    //       },
    //       body: JSON.stringify({ clickdate: data }),
    //     }
    //   );

    //   let responseData;
    //   try {
    //     responseData = await response.json();
    //     console.log("Response data:", responseData);
    //   } catch (err) {
    //     console.warn("Response is not JSON:", err);
    //   }

    //   if (response.ok) {
    //   }
    // } catch (error) {
    //   console.error("Fetch error:", error.message);
    // }
  };

  return (
    <div
      className={`homepage_container ${
        videoPreview === true ? "no_scrolling" : ""
      }`}
    >
      {videoPreview && <Videopreview setVideoPreview={setVideoPreview} />}
      <div className="homepage_sub-container">
        <div className="homepage_container-navbar">
          <div className="homepage_container-navbar_title">
            <Image className="logo" src={logo} alt="logo" />
          </div>
        </div>
        <div className="homepage_container-header">
          <Carousel
            swipeable={true}
            showArrows={false}
            showThumbs={false}
            autoPlay={true}
            infiniteLoop={true}
          >
            <div className="homepage_container-header-item">
              <Image src={phoneimage1} alt="phones" />
            </div>
            <div className="homepage_container-header-item">
              <Image src={phoneimage2} alt="phones" />
            </div>
            <div className="homepage_container-header-item">
              <Image src={phoneimage3} alt="phones" />
            </div>
          </Carousel>
          {/* <Image src={phoneimage} alt="phones" /> */}
        </div>
        <div className="homepage_container-timer">
          <div className="homepage_container-timer-card">
            <CountdownTimer />
          </div>
        </div>
        <div className="homepage_container-title">
          <div className="homepage_container-title-item-1">
            <div className="homepage_container-title-item-1-title">
              <h1>Product Name</h1>
              <h4>{data.title}</h4>
            </div>
            <div className="homepage_container-title-item-1-button">
              <div className="button_border">
                <button onClick={handleClick}>See Condition</button>
              </div>
            </div>
          </div>
          <div className="homepage_container-title-item">
            <h1>Phone Condition</h1>
            <h4>{data.condition}</h4>
          </div>
          <div className="homepage_container-title-item">
            <h1>Base Price</h1>
            <h4>₹{data.price}</h4>
          </div>
        </div>
        <div className="homepage_container-footer">
          <div className="homepage_container-footer-card">
            <label htmlFor="Email">Enter Your Email</label>
            <input
              type="email"
              id="Email"
              onChange={(e) => setisemail(e.target.value)}
              required
              defaultValue={bidform.email}
            />

            <p>{isemailsame}</p>

            <div className="homepage_container-footer-group">
              <div className="homepage_container-footer-group-item">
                <label htmlFor="Mobile">Enter Your Mobile No.</label>
                <input
                  type="number"
                  id="Mobile"
                  required
                  onChange={(e) =>
                    setbidform({ ...bidform, number: e.target.value })
                  }
                  defaultValue={bidform.number}
                />
                <p>{ismobilenumber}</p>
              </div>
              <div className="homepage_container-footer-group-item">
                <label htmlFor="Bid">Your Bid Amount</label>
                <input
                  type="number"
                  id="Bid"
                  onChange={(e) =>
                    setbidform({ ...bidform, bid: e.target.value })
                  }
                  defaultValue={bidform.bid}
                />
                <p>{isbid}</p>
              </div>
            </div>
            <button onClick={handlesubmit}>
              {isloading === true ? (
                <div className="loader" />
              ) : (
                "Place Your Bet"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
