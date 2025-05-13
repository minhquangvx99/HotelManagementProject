import styled from 'styled-components';

export const FilterContainer = styled.div`
  background-color: ${({ theme }) => theme[theme.mainContent]['white-background']};
  box-shadow: 0px 0px 2px #888;
  .ant-input {
    height: 38px;
  }
  button {
    height: 44px;
    border-radius: 6px;
  }
  .ant-input-affix-wrapper-sm {
    padding: 0px 7px;
  }
  .ant-form-item {
    margin-bottom: 14px;
  }
  .ant-input&::placeholder {
    display: flex;
    align-items: center;
    height: 100%;
  }
  .ant-select-single .ant-select-selector .ant-select-selection-search {
    left: 15px;
  }
`;

export const StyledAddQuestion = styled.div`
  .full-width {
    width: 100%;
  }

  .answer-row {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }

  .answer-row .ant-form-item {
    flex-grow: 1;
  }

  .answer-row .ant-radio-wrapper {
    padding-right: 16px;
  }

  .ant-form-item {
    margin-bottom: 8px;
  }

  textarea {
    width: 100%;
  }
  .statusStyleActive {
    width: 100% !important;
    .ant-select-selector {
      background-color: #0075ff !important;
      text-align: center !important;
      .ant-select-selection-item {
        color: white !important;
        font-weight: 550 !important;
      }
    }
  }
  .ant-select-single .ant-select-selector .ant-select-selection-search {
    left: 15px;
  }
  .statusStyleInactive {
    width: 100% !important;
    .ant-select-selector {
      background-color: #f0e68c !important;
      text-align: center !important;
      .ant-select-selection-item {
        color: black !important;
        font-weight: 550 !important;
      }
    }
  }

  .statusStyleNormal {
    width: 100% !important;
    .ant-select-selector {
      text-align: center !important;
      .ant-select-selection-item {
        color: black !important;
        font-weight: 550 !important;
      }
    }
  }

  .ScoreStyle {
    .ant-form-item-row {
      .ant-form-item-label {
        padding: 0 !important;
      }
    }
  }

  .custom-select:hover .ant-select-selector {
    border-color: #164d9e !important; /* Customize the border color as needed */
  }

  .custom-input:hover {
    border-color: #164d9e !important; /* Customize the border color as needed */
  }
  .ant-select-selector {
    width: 100% !important;
    height: 49.7px !important;
  }

  .border-red .ant-select-selector {
    border-color: red !important;
  }
`;
