import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  box: css`
    position: fixed;

    display: flex;
    flex-direction: column;

    width: 900px;

    background-color: rgba(${token.colorBgLayout}, 0.8);
    backdrop-filter: saturate(180%) blur(10px);
    border: 1px solid ${token.colorBorder};
    border-radius: ${token.borderRadius}px;
  `,
  button: css`
    cursor: pointer;

    width: 14px;
    height: 14px;
    margin-left: ${token.marginXS}px;

    border-radius: 8px;
  `,
  close: css`
    background-color: ${token['red-7']};
  `,
  container: css`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    height: 640px;
  `,
  footer: css`
    border-top: 1px solid ${token.colorBorder};
  `,
  content: css`
    display: flex;
    flex-direction: row;
    flex-grow: 1;

    width: 100%;
    height: 100%;
  `,
  header: css`
    cursor: move;

    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    height: 42px;
    padding: 0 ${token.paddingXS}px;

    border-bottom: 1px solid ${token.colorBorder};
  `,
  title: css`
    margin-left: ${token.marginXS}px;
  `,
  left: css`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-start;
  `,
  center: css`
    flex: 1;
    font-weight: bold;
    text-align: center;
  `,
  right: css`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-end;
  `,
}));
