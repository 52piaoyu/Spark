import React from 'react';
import {ModalForm, ProFormText} from '@ant-design/pro-form';
import {request} from "../utils/utils";
import i18n from "../locale/locale";
import {message} from "antd";

function Runner(props) {
    async function onFinish(form) {
        form.device = props.device.id;
        let basePath = location.origin + location.pathname + 'api/device/';
        request(basePath + 'exec', form).then(res => {
            if (res.data.code === 0) {
                message.success(i18n.t('executionSuccess'));
            }
        });
    }

    return (
        <ModalForm
            modalProps={{
                destroyOnClose: true,
                maskClosable: false,
            }}
            title={i18n.t('run')}
            width={380}
            onFinish={onFinish}
            onVisibleChange={visible => {
                if (!visible) props.onCancel();
            }}
            submitter={{
                render: (_, elems) => elems.pop()
            }}
            {...props}
        >
            <ProFormText
                width="md"
                name="cmd"
                label={i18n.t('cmdPlaceholder')}
                rules={[{
                    required: true
                }]}
            />
            <ProFormText
                width="md"
                name="args"
                label={i18n.t('argsPlaceholder')}
            />
        </ModalForm>
    )
}

export default Runner;