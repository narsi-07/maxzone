import React, { useState, useEffect } from 'react';

interface TradingViewWindow extends Window {
  TradingView?: any;
} 

const TradingViewWidget = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [widgetLoaded, setWidgetLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      setScriptLoaded(true);
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (scriptLoaded && !widgetLoaded) {
      if ((window as TradingViewWindow).TradingView && (window as TradingViewWindow).TradingView.widget) {
        const Widget = (window as TradingViewWindow).TradingView.widget; // Capitalizing Widget
        const widget = new Widget({
          width: '100%',
          height: window.innerHeight,
          symbol: 'COINBASE:BTCUSD',
          interval: '1',
          timezone: 'Etc/UTC',
          theme: 'dark',
          style: '1',
          locale: 'en',
          toolbar_bg: '#f1f3f6',
          enable_publishing: false,
          hide_side_toolbar: false,
          allow_symbol_change: true,
          details: true,
          studies: [
            'BB@tv-basicstudies',
            'Volume@tv-basicstudies',
            'VWAP@tv-basicstudies'
          ],
          container_id: 'tradingview_0b60e'
        });
        console.log(widget);
        setWidgetLoaded(true);
      } else {
        console.error('TradingView Widget not available.');
      }
    }
  }, [scriptLoaded, widgetLoaded]);

  return (
    <div className="tradingview-widget-container">
      <div id="tradingview_0b60e"/>
    </div>
  );
};

export default TradingViewWidget;
