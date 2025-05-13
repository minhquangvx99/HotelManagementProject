import React from 'react';
import Editor from 'ckeditor5-custom-build';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import './styles.css';
import { openNotification } from 'utility/Utility';

// Define the props interface
interface QuestionBoxProps {
  initData: string | null;
  setData: (data: string) => void;
  isDisable: boolean;
  placeHolder: string;
  isFill?: boolean;
}

const QuestionBox: React.FC<QuestionBoxProps> = ({ initData, setData, isDisable, placeHolder, isFill }) => {
  class CustomUploadAdapter {
    loader: any;

    constructor(loader: any) {
      this.loader = loader;
    }

    upload() {
      return this.loader.file.then((file: any) => {
        return new Promise((resolve, reject) => {
          if (file.size > 5 * 1024 * 1024) {
            // 5MB size limit
            openNotification('error', 'Error', 'The uploaded file must be <= 5MB');
            reject();
          } else {
            const reader = new FileReader();
            reader.onload = () => {
              resolve({ default: reader.result });
            };
            reader.onerror = (err) => {
              reject(err);
            };
            reader.readAsDataURL(file);
          }
        });
      });
    }

    abort() {
      // Handle abort if necessary
    }
  }

  const editorConfiguration = {
    placeholder: placeHolder,
    toolbar: {
      items: [
        'redo',
        'undo',
        '|',
        'heading',
        '|',
        'bold',
        'italic',
        '|',
        'link',
        'bulletedList',
        'numberedList',
        'outdent',
        'indent',
        '|',
        'imageInsert',
      ],
    },
    language: 'vi',
    image: {
      toolbar: [
        'imageTextAlternative',
        'toggleImageCaption',
        '|',
        'imageStyle:inline',
        'imageStyle:block',
        'imageStyle:side',
        '|',
        'resizeImage:original',
        'resizeImage:300',
        'resizeImage:500',
        '|',
        'imageStyle:alignLeft',
        'imageStyle:alignCenter',
        'imageStyle:alignRight',
      ],
      resizeOptions: [
        {
          name: 'resizeImage:original',
          value: null,
          label: 'Original',
        },
        {
          name: 'resizeImage:custom',
          label: 'Custom',
          value: 'custom',
        },
        {
          name: 'resizeImage:40',
          value: '40',
          label: '40%',
        },
        {
          name: 'resizeImage:60',
          value: '60',
          label: '60%',
        },
      ],
      upload: {
        types: ['jpeg', 'jpg', 'png'],
      },
    },
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
    },
  };

  return (
    <>
      <div className={isFill ? 'editor-container' : 'editor-container highlight'}>
        <CKEditor
          disabled={isDisable}
          editor={Editor}
          config={editorConfiguration}
          data={initData}
          onReady={(editor) => {
            editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
              return new CustomUploadAdapter(loader);
            };
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setData(data);
          }}
        />
      </div>
      {!isFill && <div style={{ fontSize: 16, color: '#D52929' }}>*Please fill in the information in this box</div>}
    </>
  );
};

export default QuestionBox;
