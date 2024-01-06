// import * as Cfx from 'fivem-js';

let nuiOpen = false;

function toggleNuiFrame(toggle: boolean) {
  SetNuiFocus(toggle, toggle);
  SendNUIMessage({
    action: 'setVisible',
    data: toggle,
  });
}

RegisterCommand('toggleui', (source: any, args: any) => {
  console.log('Opening ui');
  nuiOpen = !nuiOpen;

  toggleNuiFrame(nuiOpen);
}, false);

RegisterNuiCallbackType('hideFrame');
on('__cfx_nui:hideFrame', (_: any, cb: (returnData: any) => void) => {
  nuiOpen = !nuiOpen;
  toggleNuiFrame(false);
  cb({ ok: true });
});
