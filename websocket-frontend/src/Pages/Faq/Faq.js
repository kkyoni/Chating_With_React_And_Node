import React from "react";
import { Collapse } from "antd";

function Faq() {
  const items = [
    {
      key: "1",
      label: "What kind of questions can I ask the chatbot?",
      children: (
        <>
          <p style={{ color: "#000" }}>
            You can ask the chatbot any question related to our products or
            services. Some common questions include.
          </p>
          <ol>
            <li>How do I place an order?</li>
            <li>What is your return policy?</li>
            <li>How do I track my shipment?</li>
            <li>Can I change my order after it has been placed?</li>
          </ol>
        </>
      ),
    },
    {
      key: "2",
      label: "What is this chatbot for?",
      children: (
        <p style={{ color: "#000" }}>
          This chatbot is designed to provide customer service support. You can
          use it to get answers to common questions, find information about our
          products or services, and get help with any issues you may be
          experiencing.
        </p>
      ),
    },
    {
      key: "3",
      label: "How do I use the chatbot?",
      children: (
        <p style={{ color: "#000" }}>
          To use the chatbot, simply type your question or request into the chat
          window. The chatbot will then provide a response or guide you through
          the process of finding the information you need.
        </p>
      ),
    },
    {
      key: "4",
      label: "What if the chatbot can’t answer my question?",
      children: (
        <p style={{ color: "#000" }}>
          If the chatbot is unable to answer your question or provide the
          information you need, it will direct you to other resources such as
          our customer service team or website.
        </p>
      ),
    },
    {
      key: "5",
      label: "Can I use the chatbot to provide feedback or make a complaint?",
      children: (
        <p style={{ color: "#000" }}>
          Yes, you can use the chatbot to provide feedback or make a complaint.
          Simply type your message into the chat window and the chatbot will
          guide you through the process of submitting your feedback or
          complaint.
        </p>
      ),
    },
    {
      key: "6",
      label: "How do I know if my issue has been resolved?",
      children: (
        <p style={{ color: "#000" }}>
          If you have submitted a request for assistance through the chatbot,
          you will receive a confirmation message once your issue has been
          resolved. You can also check the status of your request at any time by
          asking the chatbot.
        </p>
      ),
    },
    {
      key: "7",
      label: "Can I speak to a live agent instead of using the chatbot?",
      children: (
        <p style={{ color: "#000" }}>
          Yes, if you prefer to speak with a live agent instead of using the
          chatbot, you can do so by following the prompts provided by the
          chatbot. Our customer service team is available to assist you during
          our regular business hours.
        </p>
      ),
    },
  ];
  return (
    <div className="tyn-content tyn-content-page">
      <div className="tyn-main">
        <div className="tyn-section tyn-section-lg">
          <div className="container">
            <div className="tyn-section-head tyn-text-block text-center">
              <h2 className="h1">Frequently Asked Questions</h2>
              <p>Here is some answer for few quetion.</p>
            </div>
            <div className="tyn-section-content">
              <div className="row g-gs">
                <div className="col-xl-12 col-lg-6">
                  <div
                    className="accordion d-flex flex-column gap-2"
                    id="faq-01"
                  >
                    <Collapse
                      className="accordion-item rounded"
                      items={items}
                      defaultActiveKey={["1"]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Faq;
