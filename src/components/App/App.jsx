import { useState, useEffect } from "react";
import Section from "components/Section/Section";
import FeedbackOptions from "components/FeedbackOptions/FeedbackOptions";
import Statistics from '../Statistics/Statistics';
import Notification from '../Notification/Notification';

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const options = ['good', 'neutral', 'bad'];
  const total = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage();

  function handleIncrement (option) {
    switch (option) {
      case 'good':
        setGood(prevState => prevState + 1);
        break;
      
      case 'neutral':
        setNeutral(prevState => prevState + 1);
        break;
      
      case 'bad':
        setBad(prevState => prevState + 1);
        break;
      
      default:
        return;
    };
  };

  function countTotalFeedback() {
    const totalFeedbackNumbers = good + neutral + bad;

    return totalFeedbackNumbers;
  };

  function countPositiveFeedbackPercentage() { 
    const positiveFeedbackPercent = good / countTotalFeedback() * 100;

    return Number.parseInt(positiveFeedbackPercent);
  };

  useEffect(() => {
    countTotalFeedback();
  });

  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions options={options} onLeaveFeedback={handleIncrement} />
      </Section>
      <Section title="Statistics">
        {total ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </>
  ); 
}

// =============================

// class App extends Component {
//   state = {
//     good: 0,
//     neutral: 0,
//     bad: 0,
//   };

//   handleIncrement = option => {
//     console.log(option);
//     this.setState(prevState => ({[option]: prevState[option] + 1}));
//   };

//   countTotalFeedback() {
//     const feedbackNumbers = Object.values(this.state);
//     let totalFeedbackNumbers = 0;

//     for (const value of feedbackNumbers) {
//       totalFeedbackNumbers += value;
//     }

//     return totalFeedbackNumbers;
//   };

//   countPositiveFeedbackPercentage() { 
//     const positiveFeedbackNumbers = this.state.good;
//     const positiveFeedbackPercent = positiveFeedbackNumbers / this.countTotalFeedback() * 100;

//     return Number.parseInt(positiveFeedbackPercent);
//   };

//   render() {
//     const { good, neutral, bad } = this.state;
//     const total = this.countTotalFeedback();
//     const positivePercentage = this.countPositiveFeedbackPercentage();

//     return (
//       <>
//         <Section title="Please leave feedback">
//           <FeedbackOptions options={Object.keys(this.state)} onLeaveFeedback={this.handleIncrement} />
//         </Section>
//         <Section title="Statistics">
//           {total ? (
//             <Statistics
//               good={good}
//               neutral={neutral}
//               bad={bad}
//               total={total}
//               positivePercentage={positivePercentage}
//             />
//           ) : (
//             <Notification message="There is no feedback" />
//           )}
//         </Section>
//       </>
//     );
//   }
// };

// export default App;