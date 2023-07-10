import "./footer.css";

const Footer = () => {
    return (
        <div className="footer">
            <div className="fLists">
                <ul className="fList d-flex justify-content-between">
                    <li className="fListItem">Curtomer Service</li>
                    <li className="fListItem">Partner Help</li>
                    <li className="fListItem">Careers</li>
                    <li className="fListItem">Sustainability</li>
                    <li className="fListItem">Press center</li>
                    <li className="fListItem">Safety Resource Center</li>
                    <li className="fListItem">Investor relations</li>
                    <li className="fListItem">Terms & conditions</li>
                </ul>
            </div>
            <p>Copyright © 2023 BooClo.</p>
        </div>
    );
};

export default Footer;