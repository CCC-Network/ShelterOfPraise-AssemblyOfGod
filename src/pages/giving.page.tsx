import { useState } from 'react';
import { Heart, CreditCard, Smartphone, Building, Users, Target, Gift } from 'lucide-react';
import '../styles/giving.page.css';

/* ─── Data ───────────────────────────────────────────── */
const predefinedAmounts = [100, 250, 500, 1000, 2500, 5000];

const paymentMethods = [
  {
    id: 'gcash',
    name: 'GCash',
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAnFBMVEUpe/oqfv0kb+8ia+soefggZucMPMMAJLMAI7McXt8AJ7UINb4AKrcmdPMoevoUUdUSbPIbcvoaWdsQQ8kwgPo1hfoEMLuiv/3a5f7x9v/i6/6rxf0jd/oVTtJyvfd0wPdmmvz///8+hfpDkPlmsfdVofhPj/2Bqvzz9/9st/djrvhOjPoAb/pIlflxn/tck/vT4P4AaPlbpviUtvykcxnRAAABN0lEQVR4AcWS1WLDMAxF7ZCDTpWUqyhVmfH//20qZvS8XbOPUZL6T2mtHNfxtP6N+YERhUH0k3qBiU2cpFInmYytbViWxiZvAUCriMNSK9vuNLQbd1u21x8MR22sHGuR6vaT6jxOccwPTaztTGFGc3xeaIy/YObRsrcSKNs6U1o/oI5MAkMeIKBkq3Aj24ge5+rK5BPmLSrc3YR7msGapg8YmGjJg5163nvo0Bo2tP8Gl3c4+gJLUxyZ5Q7cHrfMy6kcO3sdW5hgN+DTDi2eR8xwoQsSPc2QhaFzYB4eJuMT83VH9XZLhE8jlHECV35oJK+dy5UXfJk9jktcnAT1x+B7iFjXb+NqN4y7EQAC+Mnd8NM9Nt50xC1xWZU3n/lfXSbU5qm5Ka48/VuYOFERueqBfuNC/kAfxuEiOeXZcDAAAAAASUVORK5CYII=',
  },
  {
    id: 'paymaya',
    name: 'PayMaya',
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAATlBMVEUAAAAAAAAAAAADDwoAAAAAAAAAAAAAAABHcEwAAAAFHRMdlGAv96ETZEEr3pAKNCIZgFMMQCkkvnwRVzks5ZUu8JwmyIMfoGgnzoYhrXGCeKfMAAAACnRSTlPADP//R6uMfQCCtOwt1AAAAIJJREFUGJV1zksOwyAMBFBqk0LMxwaSQO5/0QKKqiZSR/LmLcaj7Fv9ZHkpA7csT1ATODECJb4Aw9myBHdkwQkp+i36cXuZID5KiLuE5it2QOdP4BwDyHbQhN1BGlD+gnfANZcObUKoBZATATsZpUCE10yi/nZ9Ttd3MMrq1XyzavsBCgIHw0YqlFAAAAAASUVORK5CYII=',
  },
  {
    id: 'credit',
    name: 'Credit Card',
    icon: 'https://cdn-icons-png.freepik.com/512/16576/16576723.png?uid=R54802347&ga=GA1.1.1324284911.1721478908',
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAq1BMVEX///+FlMQAAIMAAIc1TqKyuthve7QAHo4AKZEAJ5AAI49jdLNFWKUACIqTn8n4+fwAJI0AIozq7PQAZdAAeOcAcd8AP7Xf5fLHzuQAgPAAjv8Aiv9j0P/r+P+jrdEAFIwAjP9/ibwAOaAAhv9BtP9czP+56P8AR7Aqov9gzf+M2f8AWcUwp/8Yedggnf9Uxf+q4v9Qr+hj0/+M2v9Uaa4YTKfV8f8wc786jtEyKvaVAAAA2klEQVR4AcTQRRYCMRAA0cBYJ7jbuOMu9z8ZESQ0jzV/W9Em/1SpGoppfUfbAYkyo0awOoOnRhO1FlCAdkcxUOwavPX60mA4+ozjBo+TqTJzPaLzAwCYTENp6rotPUYO0PjRktTNcvRYWqg4K+fzbKFHh0J7OZ1xyWqOYssAYOtys9mstq6IO/RYZ39wubmQ6c+1AqBsO1fQRtLkEQ7PlB2J7uQAO4vocosL+WAyYFcRvVarhScbGEb15s4zl2DciFvM5+gyjZuhV+oyvvPyo3kZ9zPm3H3USq4AAckc4OeYq5wAAAAASUVORK5CYII=',
  },
  {
    id: 'bank',
    name: 'Bank Transfer',
    icon: 'https://cdn-icons-png.freepik.com/512/5950/5950447.png?uid=R54802347&ga=GA1.1.1324284911.1721478908',
  },
];

const givingImpacts = [
  { icon: Users,    title: 'Community Outreach',  description: '₱500 feeds 20 families'          },
  { icon: Building, title: 'Church Maintenance',   description: '₱1000 supports facility upkeep'  },
  { icon: Target,   title: 'Mission Work',         description: '₱2500 sponsors local missions'   },
  { icon: Gift,     title: 'Youth Programs',       description: '₱1500 funds youth activities'    },
];

/* ─── Component ──────────────────────────────────────── */
const GivingPage = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | ''>('');
  const [customAmount,   setCustomAmount]   = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');

  const displayAmount = selectedAmount
    ? `₱${selectedAmount.toLocaleString()}`
    : customAmount
    ? `₱${parseInt(customAmount).toLocaleString()}`
    : 'Now';

  return (
    <div className="giving-page">
      <div className="giving-container">

        {/* ── Header ── */}
        <div className="giving-header">
          <div className="giving-header-icon">
            <Heart color="#ef4444" size={40} />
            <h1>💸 Giving</h1>
          </div>
          <p>Online and offline giving info, support opportunities</p>
        </div>

        {/* ── Two-column grid ── */}
        <div className="giving-grid">

          {/* Left — Form */}
          <div className="giving-card">
            <h2>Give Today</h2>

            {/* Amount */}
            <div className="amount-section">
              <label>Select Amount (₱)</label>
              <div className="amount-grid">
                {predefinedAmounts.map(amt => (
                  <button
                    key={amt}
                    className={`amount-btn${selectedAmount === amt ? ' selected' : ''}`}
                    onClick={() => { setSelectedAmount(amt); setCustomAmount(''); }}
                  >
                    ₱{amt.toLocaleString()}
                  </button>
                ))}
              </div>
              <input
                id="custom-amount-input"
                type="number"
                placeholder="Enter custom amount"
                value={customAmount}
                onChange={e => { setCustomAmount(e.target.value); setSelectedAmount(''); }}
              />
            </div>

            {/* Payment Methods */}
            <div className="payment-section">
              <label>Payment Method</label>
              <div className="payment-grid">
                {paymentMethods.map(method => (
                  <button
                    key={method.id}
                    className={`payment-btn${selectedMethod === method.id ? ' selected' : ''}`}
                    onClick={() => setSelectedMethod(method.id)}
                  >
                    <img src={method.icon} alt={method.name} />
                    {method.name}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button
              className="give-cta-btn"
              disabled={!selectedAmount && !customAmount}
            >
              <Heart size={18} />
              Give {displayAmount}
            </button>
          </div>

          {/* Right — Info stack */}
          <div className="giving-right-stack">

            {/* Mission */}
            <div className="giving-card">
              <h3>Support Our Ministry</h3>
              <p style={{ color: 'var(--color-black-60)', fontSize: '0.9rem', margin: 0 }}>
                Your generous giving helps us continue our mission of spreading God's love and serving our community. Every gift, no matter the size, makes a meaningful impact.
              </p>
              <div className="mission-accent">
                <Heart size={16} />
                100% of your donation goes directly to ministry
              </div>
            </div>

            {/* Impact */}
            <div className="giving-card">
              <h3>Your Impact</h3>
              <div className="impact-list">
                {givingImpacts.map((item, i) => (
                  <div key={i} className="impact-item">
                    <item.icon className="impact-icon" size={20} />
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Other ways */}
            <div className="giving-card">
              <h3>Other Ways to Give</h3>
              <div className="other-ways-list">
                <div className="other-ways-item">
                  <Building size={18} /> Sunday offering during service
                </div>
                <div className="other-ways-item">
                  <CreditCard size={18} /> Direct bank transfer
                </div>
                <div className="other-ways-item">
                  <Smartphone size={18} /> Mobile wallet donations
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bank Details ── */}
        <div className="bank-section">
          <div className="giving-card">
            <h3>Bank Transfer Details</h3>
            <div className="bank-grid">
              <div className="bank-detail-box primary">
                <h4>Primary Account</h4>
                <p className="bank-detail-row"><span>Bank:</span> BDO Unibank</p>
                <p className="bank-detail-row"><span>Account Name:</span> Assembly of God | Shelter of Praise</p>
                <p className="bank-detail-row"><span>Account Number:</span> 1234-5678-9012</p>
              </div>
              <div className="bank-detail-box gcash">
                <h4>GCash Details</h4>
                <p className="bank-detail-row"><span>GCash Number:</span> 0917-123-4567</p>
                <p className="bank-detail-row"><span>Account Name:</span> Assembly of God | Shelter of Praise</p>
                <p className="bank-detail-row" style={{ fontSize: '0.75rem', color: 'var(--color-black-60)' }}>
                  Please use your name as reference
                </p>
              </div>
            </div>
            <p className="bank-note">
              For bank transfers and mobile payments, please send a screenshot of your transaction to our treasurer for proper recording.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default GivingPage;