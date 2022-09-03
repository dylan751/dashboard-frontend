import React from 'react';
import { Helmet } from 'react-helmet';
import { ColorPickerComponent } from '@syncfusion/ej2-react-inputs';
import { Header } from '../components';
import { useTranslation } from 'react-i18next';

const change = (args: any) => {
  const previewPenElement = document.getElementById('preview-pen');
  if (previewPenElement) {
    previewPenElement.style.backgroundColor = args.currentValue.hex;
  }
};

const ColorPicker: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Helmet>
        <title>Color Picker</title>
        <meta name="color-picker-description" content="Color Picker" />
      </Helmet>
      <Header category={t('app.app')} title={t('colorPicker.colorPicker')} />
      <div className="text-center">
        <div id="preview-pen"></div>
        <div className="flex justify-center items-center gap-20 flex-wrap">
          <div>
            <p className="text-2xl font-semibold mt-2 mb-4">Inline Pallete</p>
            <ColorPickerComponent
              id="inline-pallete"
              mode="Palette"
              modeSwitcher={false}
              inline
              showButtons={false}
              change={change}
            />
          </div>
          <div>
            <p className="text-2xl font-semibold mt-2 mb-4">Inline Picker</p>
            <ColorPickerComponent
              id="inline-picker"
              mode="Picker"
              modeSwitcher={false}
              inline
              showButtons={false}
              change={change}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
