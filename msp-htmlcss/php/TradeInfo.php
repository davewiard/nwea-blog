<?php
	class TradeInfo
	{
		private $SymbolId;
		private $SymbolName;
		private $SymbolSymbol;

		private $SectorId;
		private $SectorName;

		private $Transaction = array();

		public function __construct() { }


		/**
		 * Sector-related functions
		 */
		public function getSectorId() {
			return $this->SectorId;
		}

		public function setSectorId($value) {
			$this->SectorId = $value;
		}

		public function getSectorName() {
			return $this->SectorName;
		}

		public function setSectorName($value) {
			$this->SectorName = $value;
		}


		/**
		 * Symbol-related functions
		 */
		public function getSymbolId() {
			return $this->SymbolId;
		}

		public function setSymbolId($value) {
			$this->SymbolId = $value;
		}

		public function getSymbolSymbol() {
			return $this->SymbolSymbol;
		}

		public function setSymbolSymbol($value) {
			$this->SymbolSymbol = $value;
		}

		public function getSymbolName() {
			return $this->SymbolName;
		}

		public function setSymbolName($value) {
			$this->SymbolName = $value;
		}


		/**
		 *
		 */
		public function getShares() {
		  $shares = 0.0000;
		  for ($i = 0; $i < count($this->Transaction); $i++)  {
			$shares += number_format($this->Transaction[$i]["shares"], 4);
		  }

		  return $shares;
		}


    /**
		 * 
      Transaction is an array of hashes:
        {
          0: [
            BrokerId = 2,
            BrokerName = 'Robinhood',

            PortfolioId = 2,
            PortfolioName = 'Robinhood',

            PricePerShare = '0.00',
            PreTax = '0',
            Shares = '1.0000',
            TradeDate = '2017-12-31'
          ],

          1: [
            BrokerId = 2,
            BrokerName = 'Robinhood',

            PortfolioId = 2,
            PortfolioName = 'Robinhood',

            PricePerShare = '0.00',
            PreTax = '0',
            Shares = '1.0000',
            TradeDate = '2017-12-31'
          ]
        }

        $TradeInfo[$Index]->setTransaction(
          $trade['id'],
          $trade['tradeDate'],
          $trade['shares'],
          $trade['pricePerShare'],
          ($trade['pretax']) ? true : false,
          $broker,
          $portfolio
				);
			*
			*/

    public function setTransaction($id, $tradeDate, $shares, $pricePerShare, $pretax, $broker, $portfolio)
    {
      $this->Transaction[] = [
        "id"   => $id,
        "tradeDate" => $tradeDate,
        "shares" => $shares,
        "pricePerShare" => $pricePerShare,
        "pretax" => $pretax,
        "broker" => $broker,
        "portfoio" => $portfolio
      ];
    }
  }

?>
