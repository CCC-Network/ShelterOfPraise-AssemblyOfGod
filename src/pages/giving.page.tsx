import React, { useState } from 'react';
import { Heart, CreditCard, Smartphone, Building, Users, Target, Gift } from 'lucide-react';

const GivingPage = () => {
  const [selectedAmount, setSelectedAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');

  const predefinedAmounts = [100, 250, 500, 1000, 2500, 5000];
  
  const paymentMethods = [
    { id: 'gcash', name: 'GCash', icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAnFBMVEUpe/oqfv0kb+8ia+soefggZucMPMMAJLMAI7McXt8AJ7UINb4AKrcmdPMoevoUUdUSbPIbcvoaWdsQQ8kwgPo1hfoEMLuiv/3a5f7x9v/i6/6rxf0jd/oVTtJyvfd0wPdmmvz///8+hfpDkPlmsfdVofhPj/2Bqvzz9/9st/djrvhOjPoAb/pIlflxn/tck/vT4P4AaPlbpviUtvykcxnRAAABN0lEQVR4AcWS1WLDMAxF7ZCDTpWUqyhVmfH//20qZvS8XbOPUZL6T2mtHNfxtP6N+YERhUH0k3qBiU2cpFInmYytbViWxiZvAUCriMNSK9vuNLQbd1u21x8MR22sHGuR6vaT6jxOccwPTaztTGFGc3xeaIy/YObRsrcSKNs6U1o/oI5MAkMeIKBkq3Aj24ge5+rK5BPmLSrc3YR7msGapg8YmGjJg5163nvo0Bo2tP8Gl3c4+gJLUxyZ5Q7cHrfMy6kcO3sdW5hgN+DTDi2eR8xwoQsSPc2QhaFzYB4eJuMT83VH9XZLhE8jlHECV35oJK+dy5UXfJk9jktcnAT1x+B7iFjXb+NqN4y7EQAC+Mnd8NM9Nt50xC1xWZU3n/lfXSbU5qm5Ka48/VuYOFERueqBfuNC/kAfxuEiOeXZcDAAAAAASUVORK5CYII=', color: 'bg-blue-600' },
    { id: 'paymaya', name: 'PayMaya', icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAATlBMVEUAAAAAAAAAAAADDwoAAAAAAAAAAAAAAABHcEwAAAAFHRMdlGAv96ETZEEr3pAKNCIZgFMMQCkkvnwRVzks5ZUu8JwmyIMfoGgnzoYhrXGCeKfMAAAACnRSTlPADP//R6uMfQCCtOwt1AAAAIJJREFUGJV1zksOwyAMBFBqk0LMxwaSQO5/0QKKqiZSR/LmLcaj7Fv9ZHkpA7csT1ATODECJb4Aw9myBHdkwQkp+i36cXuZID5KiLuE5it2QOdP4BwDyHbQhN1BGlD+gnfANZcObUKoBZATATsZpUCE10yi/nZ9Ttd3MMrq1XyzavsBCgIHw0YqlFAAAAAASUVORK5CYII=', color: 'bg-green-600' },
    { id: 'credit', name: 'Credit Card', icon: 'https://cdn-icons-png.freepik.com/512/16576/16576723.png?uid=R54802347&ga=GA1.1.1324284911.1721478908', color: 'bg-purple-600' },
    { id: 'paypal', name: 'PayPal', icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAq1BMVEX///+FlMQAAIMAAIc1TqKyuthve7QAHo4AKZEAJ5AAI49jdLNFWKUACIqTn8n4+fwAJI0AIozq7PQAZdAAeOcAcd8AP7Xf5fLHzuQAgPAAjv8Aiv9j0P/r+P+jrdEAFIwAjP9/ibwAOaAAhv9BtP9czP+56P8AR7Aqov9gzf+M2f8AWcUwp/8Yedggnf9Uxf+q4v9Qr+hj0/+M2v9Uaa4YTKfV8f8wc746jtEyKvaVAAAA2klEQVR4AcTQRRYCMRAA0cBYJ7jbuOMu9z8ZESQ0jzV/W9Em/1SpGoppfUfbAYkyo0awOoOnRhO1FlCAdkcxUOwavPX60mA4+ozjBo+TqTJzPaLzAwCYTENp6rotPUYO0PjRktTNcvRYWqg4K+fzbKFHh0J7OZ1xyWqOYssAYOtys9mstq6IO/RYZ39wubmQ6c+1AqBsO1fQRtLkEQ7PlB2J7uQAO4vocosL+WAyYFcRvVarhScbGEb15s4zl2DciFvM5+gyjZuhV+oyvvPyo3kZ9zPm3H3USq4AAckc4OeYq5wAAAAASUVORK5CYII=', color: 'bg-blue-500' },
    { id: 'bank', name: 'Bank Transfer', icon: 'https://cdn-icons-png.freepik.com/512/5950/5950447.png?uid=R54802347&ga=GA1.1.1324284911.1721478908', color: 'bg-gray-600' },
  ];

  const givingImpacts = [
    { icon: Users, title: 'Community Outreach', description: '₱500 feeds 20 families' },
    { icon: Building, title: 'Church Maintenance', description: '₱1000 supports facility upkeep' },
    { icon: Target, title: 'Mission Work', description: '₱2500 sponsors local missions' },
    { icon: Gift, title: 'Youth Programs', description: '₱1500 funds youth activities' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Heart className="text-red-500 mr-3" size={48} />
            <h1 className="text-5xl font-bold text-gray-800">💸 Giving</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Online and offline giving info, support opportunities
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Left Column - Giving Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Give Today</h2>
            
            {/* Amount Selection */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Select Amount (₱)</h3>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {predefinedAmounts.map(amount => (
                  <button
                    key={amount}
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount('');
                    }}
                    className={`py-3 px-4 rounded-lg border-2 transition-all ${
                      selectedAmount === amount
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    ₱{amount.toLocaleString()}
                  </button>
                ))}
              </div>
              <input
              id="custom-amount-input"
                type="number"
                placeholder="Enter custom amount"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount('');
                }}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Payment Methods */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Payment Method</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {paymentMethods.map(method => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`flex items-center p-4 rounded-lg border-2 transition-all ${
                      selectedMethod === method.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img src={method.icon} className="mr-3 text-2xl w-6 h-6 border-1 border-gray-200 rounded-lg" /> {/* <span className="text-2xl mr-3">{method.icon}</span> */}
                    <span className="font-medium">{method.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Give Button */}
            <button 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
              disabled={!selectedAmount && !customAmount}
            >
              <Heart className="inline mr-2" size={20} />
              Give {selectedAmount ? `₱${selectedAmount.toLocaleString()}` : customAmount ? `₱${parseInt(customAmount).toLocaleString()}` : 'Now'}
            </button>
          </div>

          {/* Right Column - Information */}
          <div className="space-y-6">
            {/* Mission Statement */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Support Our Ministry</h2>
              <p className="text-gray-600 mb-6">
                Your generous giving helps us continue our mission of spreading God's love and serving our community. Every gift, no matter the size, makes a meaningful impact.
              </p>
              <div className="flex items-center text-blue-600">
                <Heart size={20} className="mr-2" />
                <span className="font-medium">100% of your donation goes directly to ministry</span>
              </div>
            </div>

            {/* Impact Examples */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Impact</h3>
              <div className="space-y-4">
                {givingImpacts.map((impact, index) => (
                  <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                    <impact.icon className="text-blue-600 mr-3 mt-1" size={24} />
                    <div>
                      <h4 className="font-semibold text-gray-800">{impact.title}</h4>
                      <p className="text-sm text-gray-600">{impact.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Other Ways to Give */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Other Ways to Give</h3>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Building className="text-gray-600 mr-3" size={20} />
                  <span className="text-gray-700">Sunday offering during service</span>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <CreditCard className="text-gray-600 mr-3" size={20} />
                  <span className="text-gray-700">Direct bank transfer</span>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Smartphone className="text-gray-600 mr-3" size={20} />
                  <span className="text-gray-700">Mobile wallet donations</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bank Details Section */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Bank Transfer Details</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-3">Primary Account</h4>
                <div className="space-y-2 text-sm">
                  <p className="font-medium text-gray-700"><span className="font-medium text-gray-700 bold">Bank:</span> BDO Unibank</p>
                  <p className="font-medium text-gray-700"><span className="font-medium text-gray-700 bold">Account Name:</span> Assembly of God | Shelter of Praise</p>
                  <p className="font-medium text-gray-700"><span className="font-medium text-gray-700 bold">Account Number:</span> 1234-5678-9012</p>
                </div>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-3">GCash Details</h4>
                <div className="space-y-2 text-sm">
                  <p className="font-medium text-gray-700"><span className="font-medium text-gray-700 bold">GCash Number:</span> 0917-123-4567</p>
                  <p className="font-medium text-gray-700"><span className="font-medium text-gray-700 bold">Account Name:</span> Assembly of God | Shelter of Praise</p>
                  <p className="text-xs text-gray-600">Please use your name as reference</p>
                </div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                For bank transfers and mobile payments, please send a screenshot of your transaction to our treasurer for proper recording.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GivingPage;