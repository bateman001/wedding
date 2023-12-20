import { useState } from "react";
import { colors } from "../utils/colors";
import hammond from "../utils/images/gloucester.webp";
import beauport from "../utils/images/gallery-ocean-house-gloucester.avif";
import atlantis from "../utils/images/atlantis.jpeg";
import capeann from "../utils/images/cape-ann-marina.jpeg";
import rockport from "../utils/images/rock-port-inn.jpeg";
import { isMobile } from "react-device-detect";

export const Travel = () => {
    const [options, setOption] = useState([
        { option: "Hotel", selected: true },
        { option: "Travel", selected: false },
        { option: "Venue", selected: false }
    ]);

    const updateSelected = (index: number, selected: boolean) => {
        const allOptions = [...options];
        const opt = allOptions.map((val, i) => {
            if (i === index) {
                val.selected = selected;
            } else {
                val.selected = !selected;
            }

            return val;
        });
        setOption(opt);
    };

    return (
        <div>
            <div
                style={{
                    height: isMobile ? "75vh" : "90vh",
                    padding: "30px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    backgroundImage: `url(${hammond})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundColor: "#f1f5f260",
                    backgroundBlendMode: "saturation"
                }}
            >
                <div
                    style={{
                        textAlign: "center",
                        alignSelf: "center"
                    }}
                >
                    <h2 style={{ fontSize: isMobile ? "40px" : "60px" }}>Your guide to</h2>
                    <h1 style={{ fontSize: isMobile ? "50px" : "100px" }}>Gloucester, Massachusetts</h1>
                </div>
            </div>

            <div>
                <div
                    style={{
                        alignSelf: "center",
                        display: "flex",
                        width: "100%",
                        backgroundColor: colors.lightGreen,
                        boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.75)"
                    }}
                >
                    {options.map((x, i) => {
                        return (
                            <div
                                key={`nav-${i}`}
                                style={{
                                    flex: 1,
                                    textAlign: "center",
                                    padding: "30px 0",
                                    color: x.selected ? colors.green : colors.white,
                                    fontSize: isMobile ? "15px" : "30px",
                                    cursor: "pointer"
                                }}
                            >
                                {x.option === "Venue" && (
                                    <a
                                        href="https://www.hammondcastle.org/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ color: colors.white, textDecoration: "none" }}
                                    >
                                        <h2 style={{ cursor: "pointer" }}>{x.option}</h2>
                                    </a>
                                )}

                                {x.option !== "Venue" && (
                                    <h2
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                            updateSelected(i, true);
                                        }}
                                    >
                                        {x.option}
                                    </h2>
                                )}
                            </div>
                        );
                    })}
                </div>

                {options[0].selected && <Hotels />}
                {options[1].selected && <Airport />}
            </div>
        </div>
    );
};

const Hotels = () => {
    const hotels = [
        {
            name: "Ocean House",
            link: "https://www.oceanhousegloucester.com/",
            pic: beauport,
            description:
                "Drive 40 miles north up the coast from Boston to experience a charming hotel in Gloucester, MA, on Cape Ann. The perfect place for relaxation and adventure, Ocean House Hotel at Bass Rocks invites you to enjoy this waterfront destination with magnificent views of the Atlantic Ocean. We're minutes away from beaches, art galleries, museums, shops, and dining."
        },
        {
            name: "The Hotel at Cape Ann Marina",
            link: "https://capeannmarina.com/",
            pic: capeann,
            description:
                "Waterfront views are not a problem when staying with us. All our rooms have expansive views looking towards Gloucester Harbor and the Annisquam River. We have several types of rooms to choose from to fit your needs featuring either king size or two double beds. Please check our availability and book online or give us a call. Be sure to checkout our Specials & Packages as well as Things To Do to plan your stay accordingly. We look to assisting you in your stay and planning your time here in Gloucester and the Cape Ann area."
        },
        {
            name: "Rock Port Inn and Suites",
            link: "http://www.rockportinnandsuites.com/",
            pic: rockport,
            description:
                "Rock Port Inn is located on five acres in scenic Rockport, Massachusetts just 35 miles north of Boston on the beautiful north shore. We are a short walk to downtown Rockport; where shopping, art galleries, restaurants and beaches await you."
        },
        {
            name: "Atlantis Ocean Front Inn",
            link: "https://atlantisoceanfrontinn.com/",
            pic: atlantis,
            description:
                "Atlantis Oceanfront Inn hotel in Gloucester MA features spectacular ocean views from every hotel room. Located less than one mile away from Good Harbor Beach, you’ll wake up to breathtaking sunrises and wind down with picture-perfect sunsets from your hotel room’s ocean-view terrace. You’ll feel right at home with our friendly staff eager to make your vacation to Gloucester a memorable one."
        }
    ];
    return (
        <div
            style={{
                height: "90%",
                padding: isMobile ? "30px 5px" : "30px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around"
            }}
        >
            <h2
                style={{
                    display: "flex",
                    justifyContent: isMobile ? "center" : "flex-start",
                    alignItems: "center",
                    flex: 0.1,
                    paddingBottom: "10px"
                }}
            >
                Recommended Hotels
            </h2>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "repeat(1, 1fr)" : "repeat(2, 1fr)",
                    gap: "20px",
                    flex: 0.9
                }}
            >
                {hotels.map((x, i) => {
                    return (
                        <div
                            key={`hotel-${i}`}
                            style={{
                                display: "flex",
                                padding: "10px",
                                borderRadius: "20px",
                                backgroundColor: colors.grey,
                                height: isMobile ? "25vh" : "50vh"
                            }}
                        >
                            <div
                                style={{
                                    flex: 1,
                                    backgroundImage: `url(${x.pic})`,
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                    borderRadius: "20px"
                                }}
                            ></div>
                            <div
                                style={{
                                    flex: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-around",
                                    paddingLeft: "10px"
                                }}
                            >
                                <a
                                    style={{ fontSize: isMobile ? "20px" : "30px", color: "black" }}
                                    href={x.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {x.name}
                                </a>
                                {!isMobile && <p style={{ fontSize: "20px", overflowY: "scroll" }}>{x.description}</p>}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const Airport = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                margin: isMobile ? "0 10px" : "0 15%"
            }}
        >
            <div style={{ textAlign: "center", padding: "10px 0" }}>
                <h2 style={{ fontSize: isMobile ? "20px" : "40px", padding: "10px 0" }}>
                    Your Guide to Getting from Logan Airport to Gloucester, MA
                </h2>

                <p>
                    We're eagerly awaiting your arrival to celebrate our special day! To help you get from Logan
                    International Airport to Gloucester, we’ve compiled this quick guide.
                </p>
            </div>

            <div
                style={{
                    padding: isMobile ? "20px 0" : "10px 0",
                    minHeight: "35vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                }}
            >
                <h2 style={{ fontSize: "30px", paddingBottom: isMobile ? "20px" : 0 }}>
                    Step 1: From Logan Airport to North Station, Boston
                </h2>

                <div>
                    <h4 style={{ fontSize: "20px" }}>Option A: Public Transport</h4>
                    <ol style={{ padding: "0 30px" }}>
                        <li style={{ margin: "10px 0" }}>
                            <a
                                href="https://www.massport.com/logan-airport/to-from-logan/transportation-options/on-airport-shuttle/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Free Airport Shuttle:
                            </a>{" "}
                            After landing, locate the free Massport shuttle buses (usually Bus #22 or #33) to take you
                            to the Airport subway station.
                        </li>
                        <li style={{ margin: "10px 0" }}>
                            <a
                                href="https://www.mbta.com/schedules/Blue/line"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Blue Line Metro:
                            </a>{" "}
                            At the Airport station, board a Blue Line train headed toward Bowdoin. Exit at the “State”
                            stop.
                        </li>
                        <li style={{ margin: "10px 0" }}>
                            <a
                                href="https://www.mbta.com/schedules/Orange/line?schedule_direction%5Bdirection_id%5D=1&schedule_direction%5Bvariant%5D=Orange-3-1"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Orange Line Metro:
                            </a>{" "}
                            At State Street, switch to an Orange Line train going to Oak Grove. Get off at North
                            Station.
                        </li>
                    </ol>
                </div>

                <div>
                    <h4 style={{ fontSize: "20px" }}>Option B: Uber or Lyft</h4>
                    <ul style={{ padding: "0 30px" }}>
                        <li style={{ margin: "10px 0" }}>
                            For a more direct option, you can take an Uber or Lyft from Logan Airport to{" "}
                            <a href="https://goo.gl/maps/FvPqamkekRUB1nJ16" target="_blank" rel="noopener noreferrer">
                                North Station
                            </a>
                            , usually a 10-20 minute ride depending on traffic.
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 style={{ fontSize: "20px" }}>Option C: Car Rental</h4>
                    <ul style={{ padding: "0 30px" }}>
                        <li style={{ margin: "10px 0" }}>
                            If you prefer the freedom of driving, there are multiple car rental agencies at Logan
                            Airport where you can rent a vehicle.{" "}
                            <a
                                href="https://www.google.com/maps/dir/Logan+Airport,+East+Boston,+MA/Beauport+Hotel+Gloucester,+55+Commercial+St,+Gloucester,+MA+01930/@42.4942156,-71.0564298,11z/data=!3m2!4b1!5s0x89e3251ee58d4321:0xe646e3ba886a1adf!4m14!4m13!1m5!1m1!1s0x89e37014d5da4937:0xc9394c31f2d5144!2m2!1d-71.0097645!2d42.3655752!1m5!1m1!1s0x89e3251eefc84c31:0xffa9ac9a5e04543e!2m2!1d-70.6652692!2d42.6093571!3e0?entry=ttu"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                The drive
                            </a>{" "}
                            to the Beauport Hotel in Gloucester is generally straightforward and takes about 45 minutes
                            to an hour, depending on traffic.
                        </li>
                    </ul>
                </div>
            </div>

            <div
                style={{
                    padding: isMobile ? "20px 0" : "10px 0",
                    minHeight: "35vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                }}
            >
                <div>
                    <h2 style={{ fontSize: "30px" }}>Step 2: From North Station to Gloucester</h2>
                    <ol style={{ padding: "0 30px" }}>
                        <li style={{ margin: "10px 0" }}>
                            <a
                                href="https://www.mbta.com/schedules/CR-Newburyport/line"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Newburyport/Rockport Line:
                            </a>{" "}
                            At North Station, proceed to the Commuter Rail platforms. Buy a ticket for the
                            Newburyport/Rockport Line that stops at Gloucester.
                        </li>
                        <li style={{ margin: "10px 0" }}>
                            Final Stretch: After an hour-long train ride, you’ll arrive in Gloucester.
                        </li>
                    </ol>
                </div>

                <div>
                    <h2 style={{ padding: isMobile ? "20px 0" : 0, fontSize: "30px" }}>Helpful Tips:</h2>
                    <ul style={{ padding: "0 30px" }}>
                        <li style={{ margin: "10px 0" }}>
                            Train Timings:{" "}
                            <a
                                href="https://www.mbta.com/schedules/CR-Newburyport/line"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Schedules for the Newburyport/Rockport Line
                            </a>{" "}
                            may differ on weekends and holidays. Make sure to check it ahead of time.
                        </li>
                        <li style={{ margin: "10px 0" }}>
                            How to Buy Tickets: Purchase tickets at North Station, through the MBTA mTicket app (
                            <a
                                href="https://apps.apple.com/us/app/mbta-mticket/id560487958"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                iPhone
                            </a>{" "}
                            or{" "}
                            <a
                                href="https://play.google.com/store/apps/details?id=com.mbta.mobileapp&hl=en&gl=US"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Android
                            </a>
                            ), or onboard (though it costs a bit more if purchased on the train).
                        </li>
                        <li style={{ margin: "10px 0" }}>
                            Estimated Time: Allow for a total travel time of about 2 to 2.5 hours to account for
                            potential delays and transition between modes of transport.
                        </li>
                        <li style={{ margin: "10px 0" }}>
                            Navigation Apps: For real-time updates, consider using navigation apps like Google Maps.
                        </li>
                    </ul>
                </div>

                <p style={{ textAlign: "center" }}>We can't wait to celebrate with you!</p>
            </div>
        </div>
    );
};
